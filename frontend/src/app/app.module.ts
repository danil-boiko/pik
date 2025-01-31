import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayerSwitcherComponent } from './layer-switcher/layer-switcher.component'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayerSwitcherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
