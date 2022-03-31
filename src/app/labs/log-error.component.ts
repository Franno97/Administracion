import { ValidationErrorComponent } from "@abp/ng.theme.basic";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-validation-error",
  template: `TODO: Test.Validation.Automatic
    <div
      class="font-weight-bold font-italic px-1 invalid-feedback"
      *ngFor="let error of abpErrors; trackBy: trackByFn"
    >
      {{ error.message | abpLocalization: error.interpoliteParams }}
       ------
      {{ error | json }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogErrorComponent extends ValidationErrorComponent {}