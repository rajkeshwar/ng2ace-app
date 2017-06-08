import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2vSpinner, LimitPipe } from './spinner-component';
import { Ng2vSpinnerConfig } from './spinner-config';

@NgModule({
    imports: [CommonModule],
    declarations: [Ng2vSpinner, LimitPipe],
    exports: [Ng2vSpinner, LimitPipe]
})
export class Ng2vSpinnerModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: Ng2vSpinnerModule, providers: [Ng2vSpinnerConfig] };
    }
}
