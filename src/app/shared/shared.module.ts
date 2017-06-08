/**
 * @author   : Rajkeshwawr Prasad (rajkeshwar.pd@gmail.com) 
 * @date     : 2017-05-26 13:05:16 
 * @copyright: (c) 2016 Kanerika Software Pvt. Ltd. 
 * @website  : http://kanerika.com/ 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as CommonDirectives from './directives/common.directive';
import { ActivityComponent } from './activity/activity.component';
import { FriendsComponent } from './friends/friends.component';
import { PhotosComponent } from './photos/photos.component';
import { StatsComponent } from './stats/stats.component';
import { TabsComponent } from './tabs/tabs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageFooterComponent } from './message-footer/message-footer.component';
import { MessageFromComponent } from './message-from/message-from.component';
import { MessageContentComponent } from './message-content/message-content.component';
import { MessageActionsComponent } from './message-actions/message-actions.component';
import { MessageSelectComponent } from './message-select/message-select.component';
import { MessageSortComponent } from './message-sort/message-sort.component';
import { InboxComponent } from './inbox/inbox.component';
import { WriteMailComponent } from './write-mail/write-mail.component';
import { InboxReadComponent } from './inbox-read/inbox-read.component';
import { PricingTableSmallComponent } from './pricing-table-small/pricing-table-small.component';
import { PricingTableLargeComponent } from './pricing-table-large/pricing-table-large.component';
import { TimelineStyle1Component } from './timeline-style1/timeline-style1.component';
import { TimelineStyle2Component } from './timeline-style2/timeline-style2.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        CommonDirectives.SlimScrollDirective,
        ActivityComponent,
        FriendsComponent,
        PhotosComponent,
        StatsComponent,
        TabsComponent,
        NavbarComponent,
        MessageListComponent,
        MessageFooterComponent,
        MessageFromComponent,
        MessageContentComponent,
        MessageActionsComponent,
        MessageSelectComponent,
        MessageSortComponent,
        InboxComponent,
        WriteMailComponent,
        InboxReadComponent,
        PricingTableSmallComponent,
        PricingTableLargeComponent,
        TimelineStyle1Component,
        TimelineStyle2Component
    ],
    exports: [
        CommonDirectives.SlimScrollDirective,
        ActivityComponent,
        FriendsComponent,
        PhotosComponent,
        StatsComponent,
        TabsComponent,
        NavbarComponent,
        MessageListComponent,
        MessageFooterComponent,
        MessageFromComponent,
        MessageContentComponent,
        MessageActionsComponent,
        MessageSelectComponent,
        MessageSortComponent,
        InboxComponent,
        WriteMailComponent,
        InboxReadComponent,
        PricingTableSmallComponent,
        PricingTableLargeComponent,
        TimelineStyle1Component,
        TimelineStyle2Component
    ]
})
export class SharedModule {}