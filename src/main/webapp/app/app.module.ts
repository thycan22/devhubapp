import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DevAppSharedModule } from 'app/shared/shared.module';
import { DevAppCoreModule } from 'app/core/core.module';
import { DevAppAppRoutingModule } from './app-routing.module';
import { DevAppHomeModule } from './home/home.module';
import { DevAppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DayPilotModule } from 'daypilot-pro-angular';

@NgModule({
  imports: [
    BrowserModule,
    DevAppSharedModule,
    DevAppCoreModule,
    DevAppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DevAppEntityModule,
    DevAppAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class DevAppAppModule {}
