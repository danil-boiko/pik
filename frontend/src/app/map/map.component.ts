import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map.service';
import { LayersService } from '../services/layers.service';

enum LayerTypeEnum {
  'A||B' = '1',
  'A' = '2',
  'B' = '3',
  'A&&B' = '4'
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private addedLayers: L.Layer[] = [];

  constructor(
    private mapService: MapService,
    private layerService: LayersService,
    ) { }

  private initMap(): void {
    this.mapService.map = L.map('map', {
      center: [ 55.75, 37.61 ],
      zoom: 12
    });
  }

  private removeAddedLayers(): void {
    this.addedLayers.forEach(layer => {
      this.mapService.map.removeLayer(layer);
    });
    this.addedLayers = [];
  }

  private addLayerToMap(layer: L.Layer): void {
    this.mapService.map.addLayer(layer);
    this.addedLayers.push(layer);
  }

  private initBaseLayer(): void {
    this.mapService.map.addLayer(this.layerService.tiles);
  }

  private getAllLayers(): void {
    try {
      this.layerService.fetchAllLayers().subscribe(data => {
        const layer = L.geoJSON(data, {style: {color: "red", fillOpacity: 0.5, weight: 3}});
        this.addLayerToMap(layer)
      });
    } catch (error) {
      console.log(error)
    }
  }

  private getLayerById(layerID:number): void {
    try {
      this.layerService.fetchLayerById(layerID).subscribe(data => {
        const layer = L.geoJSON(data, {style: {color: "red", fillOpacity: 0.5, weight: 3}});
        this.addLayerToMap(layer)
      });
    } catch (error) {
      console.log(error)
    }
  }

  private getLayerIntersection():void {
    try {
      this.layerService.fetchLayersIntersection().subscribe(data => {
        const layer = L.geoJSON(data, {style: {color: "red", fillOpacity: 0.5, weight: 3}});
        this.addLayerToMap(layer)
      });
    } catch (error) {
      console.log(error)
    }
  }

  public handleRadioButtonChange(option: string):void {
    this.removeAddedLayers();
    switch(option){
      case LayerTypeEnum['A||B']:
        this.getAllLayers()
        break;
      case LayerTypeEnum.A :
        this.getLayerById(1)
        break;
      case LayerTypeEnum.B :
        this.getLayerById(2)
        break;
      case LayerTypeEnum['A&&B'] :
        this.getLayerIntersection()
        break;
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayer();
    this.getAllLayers();
  }
}
