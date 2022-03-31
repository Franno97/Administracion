import { Config } from "src/assets/Config";
import { FaceTecFaceScanProcessor, FaceTecFaceScanResultCallback, FaceTecSessionResult } from "src/assets/core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "src/assets/core-sdk/FaceTecSDK.js/FaceTecSDK";

export class ProfilePhotoIDMatchProcessor implements FaceTecFaceScanProcessor {
  latestNetworkRequest: XMLHttpRequest = new XMLHttpRequest();
  public latestSessionResult: FaceTecSessionResult | null;

  //
  // DEVELOPER NOTE:  These properties are for demonstration purposes only so the Sample App can get information about what is happening in the processor.
  // In the code in your own App, you can pass around signals, flags, intermediates, and results however you would like.
  //
  success: boolean;
  sampleAppControllerReference: any;

  idScanResult: any;
  idScanResultCallback: any;
  externalDatabaseRefIDF: any;


  constructor(sessionToken: string, sampleAppControllerReference: any) {

    //
    // DEVELOPER NOTE:  These properties are for demonstration purposes only so the Sample App can get information about what is happening in the processor.
    // In the code in your own App, you can pass around signals, flags, intermediates, and results however you would like.
    //
    this.success = false;
    this.sampleAppControllerReference = sampleAppControllerReference;
    this.latestSessionResult = null;

    //
    // Part 1:  Starting the FaceTec Session
    //
    // Required parameters:
    // - FaceTecFaceScanProcessor:  A class that implements FaceTecFaceScanProcessor, which handles the FaceScan when the User completes a Session.  In this example, "this" implements the class.
    // - sessionToken:  A valid Session Token you just created by calling your API to get a Session Token from the Server SDK.
    //
    new FaceTecSDK.FaceTecSession(
      this,
      sessionToken
    );
  }

  //
  // Part 2:  Handling the Result of a FaceScan
  //
  public processSessionResultWhileFaceTecSDKWaits(sessionResult: FaceTecSessionResult, faceScanResultCallback: FaceTecFaceScanResultCallback) {

    this.latestSessionResult = sessionResult;

    //
    // Part 3:  Handles early exit scenarios where there is no FaceScan to handle -- i.e. User Cancellation, Timeouts, etc.
    //
    if (sessionResult.status !== FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully) {
      console.log("Session was not completed successfully, cancelling.  Session Status: " + FaceTecSDK.FaceTecSessionStatus[sessionResult.status]);
      this.latestNetworkRequest.abort();
      faceScanResultCallback.cancel();
      return;
    }

    // IMPORTANT:  FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully DOES NOT mean the Enrollment was Successful.
    // It simply means the User completed the Session and a 3D FaceScan was created.  You still need to perform the Enrollment on your Servers.

    //
    // Part 4:  Get essential data off the FaceTecSessionResult
    //
    const parameters = {
      faceScan: sessionResult.faceScan,
      auditTrailImage: sessionResult.auditTrail[0],
      lowQualityAuditTrailImage: sessionResult.lowQualityAuditTrail[0],
      sessionId: sessionResult.sessionId,
      externalDatabaseRefID: this.sampleAppControllerReference.getLatestEnrollmentIdentifier()
    };

    this.externalDatabaseRefIDF = this.sampleAppControllerReference.getLatestEnrollmentIdentifier();

    //
    // Part 5:  Make the Networking Call to Your Servers.  Below is just example code, you are free to customize based on how your own API works.
    //
    this.latestNetworkRequest = new XMLHttpRequest();
    this.latestNetworkRequest.open("POST", Config.BaseURL + "/enrollment-3d");
    this.latestNetworkRequest.setRequestHeader("Content-Type", "application/json");

    this.latestNetworkRequest.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
    this.latestNetworkRequest.setRequestHeader("X-User-Agent", FaceTecSDK.createFaceTecAPIUserAgentString(sessionResult.sessionId as string));

    this.latestNetworkRequest.onreadystatechange = () => {

      //
      // Part 6:  In our Sample, we evaluate a boolean response and treat true as was successfully processed and should proceed to next step,
      // and handle all other responses by cancelling out.
      // You may have different paradigms in your own API and are free to customize based on these.
      //

      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          const responseJSON = JSON.parse(this.latestNetworkRequest.responseText);
          const scanResultBlob = responseJSON.scanResultBlob;

          // In v9.2.0+, we key off a new property called wasProcessed to determine if we successfully processed the Session result on the Server.
          // Device SDK UI flow is now driven by the proceedToNextStep function, which should receive the scanResultBlob from the Server SDK response.
          if (responseJSON.wasProcessed) {

            this.idScanResult = sessionResult;
            this.idScanResultCallback = faceScanResultCallback;

            // Demonstrates dynamically setting the Success Screen Message.
            FaceTecSDK.FaceTecCustomization.setOverrideResultScreenSuccessMessage("Liveness\nConfirmed");

            // In v9.2.0+, simply pass in scanResultBlob to the proceedToNextStep function to advance the User flow.
            // scanResultBlob is a proprietary, encrypted blob that controls the logic for what happens next for the User.
            faceScanResultCallback.proceedToNextStep(scanResultBlob);
          }
          else {
            // CASE:  UNEXPECTED response from API.  Our Sample Code keys off a wasProcessed boolean on the root of the JSON object --> You define your own API contracts with yourself and may choose to do something different here based on the error.
            console.log("Unexpected API response, cancelling out.");
            faceScanResultCallback.cancel();
          }
        }
        catch {
          // CASE:  Parsing the response into JSON failed --> You define your own API contracts with yourself and may choose to do something different here based on the error.  Solid server-side code should ensure you don't get to this case.
          console.log("Exception while handling API response, cancelling out.");
          faceScanResultCallback.cancel();
        }
      }
    };

    this.latestNetworkRequest.onerror = () => {

      // CASE:  Network Request itself is erroring --> You define your own API contracts with yourself and may choose to do something different here based on the error.
      console.log("XHR error, cancelling.");
      faceScanResultCallback.cancel();
    };

    //
    // Part 7:  Demonstrates updating the Progress Bar based on the progress event.
    //
    this.latestNetworkRequest.upload.onprogress = (event) => {

      const progress = event.loaded / event.total;
      faceScanResultCallback.uploadProgress(progress);
    };

    //
    // Part 8:  Actually send the request.
    //
    const jsonStringToUpload = JSON.stringify(parameters);
    this.latestNetworkRequest.send(jsonStringToUpload);

    //
    // Part 9:  For better UX, update the User if the upload is taking a while.  You are free to customize and enhance this behavior to your liking.
    //
    window.setTimeout(() => {

      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        return;
      }
      faceScanResultCallback.uploadMessageOverride("Still Uploading...");
    }, 6000);
  }


  public onFaceTecSDKCompletelyDone = () => {
    this.success = this.latestSessionResult!.isCompletelyDone;

    if (!this.success) {
      this.sampleAppControllerReference.clearLatestEnrollmentIdentifier();
    } else {
      this.match3d2dProfilePic();
    }

    this.sampleAppControllerReference.onComplete(this.latestSessionResult, null, this.latestNetworkRequest.status);
  }

  public isSuccess = () => {

    return this.success;
  }


  match3d2dProfilePic() {
    console.log("passing by match3d2dProfilePic");

    if (this.idScanResult.status !== FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully) {
      console.log("ID Scan was not completed successfully, cancelling.");
      this.latestNetworkRequest.abort();
      // faceScanResultCallback.cancel();
      this.idScanResultCallback.cancel();
      return;
    }

    const parameters = {
      image: this.sampleAppControllerReference.image2dBase64,
      externalDatabaseRefID: this.externalDatabaseRefIDF,
      minMatchLevel: this.sampleAppControllerReference.minMatchLevelFoto
    };

    //
    // Part 5:  Make the Networking Call to Your Servers.  Below is just example code, you are free to customize based on how your own API works.
    //
    this.latestNetworkRequest = new XMLHttpRequest();
    this.latestNetworkRequest.open("POST", Config.BaseURL + "/match-3d-2d-profile-pic");
    this.latestNetworkRequest.setRequestHeader("Content-Type", "application/json");

    this.latestNetworkRequest.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
    this.latestNetworkRequest.setRequestHeader("X-User-Agent", FaceTecSDK.createFaceTecAPIUserAgentString(this.idScanResult.sessionId));

    this.latestNetworkRequest.onreadystatechange = () => {

      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        try {
          const responseJSON = JSON.parse(this.latestNetworkRequest.responseText);

          if (!responseJSON.success) {
            const mensajeF = "La foto 3d no coincide con la foto 2d";
            console.log(mensajeF);
          } else {
            console.log(responseJSON);
            console.log("Su foto en 3d con la foto en 2d coinciden.");
          }

          this.sampleAppControllerReference.onCompletePictureCompare(responseJSON.success);

        }
        catch (ex) {
          console.log(ex);
          console.log("Exception while handling API response, cancelling out.");
          // faceScanResultCallback.cancel();
          this.idScanResultCallback.cancel();
        }
      }
    };

    this.latestNetworkRequest.onerror = () => {

      // CASE:  Network Request itself is erroring --> You define your own API contracts with yourself and may choose to do something different here based on the error.
      console.log("XHR error, cancelling.");
      this.idScanResultCallback.cancel();
    };


    this.latestNetworkRequest.upload.onprogress = (event) => {

      const progress = event.loaded / event.total;
      this.idScanResultCallback.uploadProgress(progress);
    };


    const jsonStringToUpload = JSON.stringify(parameters);
    console.log("passing by this.latestNetworkRequest");
    this.latestNetworkRequest.send(jsonStringToUpload);


    /* window.setTimeout(() => {

      if (this.latestNetworkRequest.readyState === XMLHttpRequest.DONE) {
        return;
      }
      this.idScanResultCallback.uploadMessageOverride("Subiendo...");
    }, 6000); */
  }


}

