import { Component, OnInit } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { BillUploadService } from '~/app/services/bill-upload.service';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

@Component({
  selector: 'ns-camera-bill',
  templateUrl: './camera-bill.component.html',
  styleUrls: ['./camera-bill.component.css'],
  moduleId: module.id,
})
export class CameraBillComponent implements OnInit {

  image: ImageAsset;

  constructor(private billUploadService: BillUploadService) { }

  async takePicture(): Promise<void> {
    this.image = await camera.takePicture();
  }

  async uploadPicture(): Promise<void> {
    const source: ImageSource = await new ImageSource().fromAsset(this.image);
    const base64String: string = source.toBase64String("jpeg");
    this.billUploadService.uploadPicture(base64String)
      .subscribe();
  }

  ngOnInit(): void { }

}
