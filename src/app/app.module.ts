import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2vModule } from './shared/ng2v-components/index';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './include/header/header.component';
import { SideMenuComponent } from './include/side-menu/side-menu.component';
import { BreadcrumbsComponent } from './include/breadcrumbs/breadcrumbs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TypographyComponent } from './typography/typography.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { ElementsComponent } from './ui-elements/elements/elements.component';
import { ButtonsIconsComponent } from './ui-elements/buttons-icons/buttons-icons.component';
import { TreeViewComponent } from './ui-elements/tree-view/tree-view.component';
import { NestableListsComponent } from './ui-elements/nestable-lists/nestable-lists.component';
import { SimpleTableComponent } from './tables/simple-table/simple-table.component';
import { DataGridComponent } from './tables/data-grid/data-grid.component';
import { TablesComponent } from './tables/tables.component';
import { FormsComponent } from './forms/forms.component';
import { FormElementsComponent } from './forms/form-elements/form-elements.component';
import { VizardValidationComponent } from './forms/vizard-validation/vizard-validation.component';
import { WysiwygMarkdownComponent } from './forms/wysiwyg-markdown/wysiwyg-markdown.component';
import { DropzoneFileUploadComponent } from './forms/dropzone-file-upload/dropzone-file-upload.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MorePagesComponent } from './more-pages/more-pages.component';
import { UserProfileComponent } from './more-pages/user-profile/user-profile.component';
import { PricingTablesComponent } from './more-pages/pricing-tables/pricing-tables.component';
import { InvoiceComponent } from './more-pages/invoice/invoice.component';
import { TimelineComponent } from './more-pages/timeline/timeline.component';
import { LoginRegisterComponent } from './more-pages/login-register/login-register.component';
import { OtherPagesComponent } from './other-pages/other-pages.component';
import { FaqComponent } from './other-pages/faq/faq.component';
import { Error404Component } from './other-pages/error404/error404.component';
import { Error500Component } from './other-pages/error500/error500.component';
import { GridComponent } from './other-pages/grid/grid.component';
import { BlankPageComponent } from './other-pages/blank-page/blank-page.component';
import { NotificationsComponent } from './include/notifications/notifications.component';
import { TasksComponent } from './include/tasks/tasks.component';
import { MessagesComponent } from './include/messages/messages.component';
import { UserMenuComponent } from './include/user-menu/user-menu.component';
import { SharedModule } from './shared/shared.module';
import { Style1Component } from './more-pages/user-profile/style1/style1.component';
import { Style2Component } from './more-pages/user-profile/style2/style2.component';
import { Style3Component } from './more-pages/user-profile/style3/style3.component';
import { MailComponent } from './more-pages/mail/mail.component';
import { SourceCodeComponent, Ng2vTreeModule } from './source-code/source-code.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    BreadcrumbsComponent,
    DashboardComponent,
    TypographyComponent,
    UiElementsComponent,
    ElementsComponent,
    ButtonsIconsComponent,
    TreeViewComponent,
    NestableListsComponent,
    SimpleTableComponent,
    DataGridComponent,
    TablesComponent,
    FormsComponent,
    FormElementsComponent,
    VizardValidationComponent,
    WysiwygMarkdownComponent,
    DropzoneFileUploadComponent,
    WidgetsComponent,
    CalendarComponent,
    GalleryComponent,
    MorePagesComponent,
    UserProfileComponent,
    PricingTablesComponent,
    InvoiceComponent,
    TimelineComponent,
    LoginRegisterComponent,
    OtherPagesComponent,
    FaqComponent,
    Error404Component,
    Error500Component,
    GridComponent,
    BlankPageComponent,
    NotificationsComponent,
    TasksComponent,
    MessagesComponent,
    UserMenuComponent,
    Style1Component,
    Style2Component,
    Style3Component,
    MailComponent,
    SourceCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2vModule.forRoot(),
    routing,
    SharedModule,
    Ng2vTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
