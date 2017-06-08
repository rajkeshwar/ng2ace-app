import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TypographyComponent } from './typography/typography.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { ElementsComponent } from './ui-elements/elements/elements.component';
import { ButtonsIconsComponent } from './ui-elements/buttons-icons/buttons-icons.component';
import { TreeViewComponent } from './ui-elements/tree-view/tree-view.component';
import { NestableListsComponent } from './ui-elements/nestable-lists/nestable-lists.component';
import { TablesComponent } from './tables/tables.component';
import { GridComponent } from './other-pages/grid/grid.component';
import { FormsComponent } from './forms/forms.component';
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
import { BlankPageComponent } from './other-pages/blank-page/blank-page.component';
import { DataGridComponent } from './tables/data-grid/data-grid.component';
import { SimpleTableComponent } from './tables/simple-table/simple-table.component';
import { FormElementsComponent } from './forms/form-elements/form-elements.component';
import { VizardValidationComponent } from './forms/vizard-validation/vizard-validation.component';
import { Style1Component } from './more-pages/user-profile/style1/style1.component';
import { Style2Component } from './more-pages/user-profile/style2/style2.component';
import { Style3Component } from './more-pages/user-profile/style3/style3.component';
import { MailComponent } from './more-pages/mail/mail.component';
import { InboxComponent } from './shared/inbox/inbox.component';
import { WriteMailComponent } from './shared/write-mail/write-mail.component';
import { InboxReadComponent } from './shared/inbox-read/inbox-read.component';
import { MessageListComponent } from './shared/message-list/message-list.component';
import { MessageFromComponent } from './shared/message-from/message-from.component';
import { MessageContentComponent } from './shared/message-content/message-content.component';
import { TimelineStyle1Component } from './shared/timeline-style1/timeline-style1.component';
import { TimelineStyle2Component } from './shared/timeline-style2/timeline-style2.component';
import { SourceCodeComponent } from './source-code/source-code.component';

export const routes:Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'typography', component: TypographyComponent},
    { 
        path: 'uielements', 
        component: UiElementsComponent,
        children: [
            { path: '', redirectTo: 'elements', pathMatch:'full'},            
            { path: 'elements', component: ElementsComponent},
            { path: 'buttons', component: ButtonsIconsComponent},
            { path: 'treeview', component: TreeViewComponent},
            { path: 'nestable-list', component: NestableListsComponent},
        ]
    },
    { path: 'tables', component: TablesComponent, children: [
        { path: '', redirectTo: 'simple', pathMatch: 'full' },        
        { path: 'simple', component: SimpleTableComponent },
        { path: 'data-grid', component: DataGridComponent }
    ]},
    { path: 'forms', component: FormsComponent, children: [
        { path: '', redirectTo: 'form-elements', pathMatch: 'full' },        
        { path: 'form-elements', component: FormElementsComponent },
        { path: 'form-wizard', component: VizardValidationComponent },
        { path: 'wysiwyg', component: WysiwygMarkdownComponent },
        { path: 'dropzone', component: DropzoneFileUploadComponent }
    ]},
    { path: 'widgets', component: WidgetsComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'more-pages', component: MorePagesComponent, children: [
        { path: '', redirectTo: 'profile', pathMatch: 'full' },        
        { path: 'profile', component: UserProfileComponent, children: [
            { path: '', redirectTo: 'style1', pathMatch: 'full'},
            { path: 'style1', component: Style1Component},
            { path: 'style2', component: Style2Component},
            { path: 'style3', component: Style3Component}
        ] },
        { path: 'mail', component: MailComponent, children: [
            { path: '', redirectTo: 'inbox', pathMatch: 'full' },
            { path: 'inbox', component: MessageListComponent },
            { path: 'inbox/:mailId', component: MessageContentComponent },
            { path: 'write', component: MessageFromComponent }
        ] }, 
        { path: 'pricing', component: PricingTablesComponent },
        { path: 'invoice', component: InvoiceComponent },
        { path: 'timeline', component: TimelineComponent, children: [
            { path: '',  redirectTo:'style1', pathMatch:'full'},
            { path: 'style1', component: TimelineStyle1Component},
            { path: 'style2', component: TimelineStyle2Component}
        ] },
        { path: 'login', component: LoginRegisterComponent }
    ]},
    { path: 'other-pages', component: OtherPagesComponent, children: [
        { path: '', redirectTo: 'faq', pathMatch: 'full' },        
        { path: 'faq', component: FaqComponent },
        { path: 'error404', component: Error404Component },
        { path: 'error500', component: Error500Component },
        { path: 'grid', component: GridComponent },
        { path: 'blank-page', component: BlankPageComponent }
    ]},  
    { path: 'source-code', component: SourceCodeComponent },    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});