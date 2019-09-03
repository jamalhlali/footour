import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FootourSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [FootourSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [FootourSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FootourSharedModule {
  static forRoot() {
    return {
      ngModule: FootourSharedModule
    };
  }
}
