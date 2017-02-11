import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];


  constructor(public navCtrl: NavController, public ModalCtrl: ModalController, public dataService: Data) {
    this.dataService.getData().then((todos) => {
      if(todos){
        this.items =JSON.parse(todos);
      }
    });
  }

ionViewDidLoad(){
}
    addItem(){
      let addModal = this.ModalCtrl.create(AddItemPage);

      addModal.onDidDismiss((item) => {
        if(item){
          this.saveItem(item);
        }
      });

    addModal.present();

  }
  // SAVE ITEMS //

    saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

// VIEW ITEMS //

    viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
    item: item
  });
    }

    //removeItem(item){
    //let index = this.items.indexOf(item);

    //if(index > -1){
    //  this.items.splice(index, 1);
   // }
 // }
  
  // THIS IS THE OLD CODE FROM JOSH M TUT - 2015
  // https://www.joshmorony.com/ionic-2-how-to-create-a-sliding-delete-button-for-lists/
  //    removeItem(item){
  //   for(i = 0; i < this.items.length; i++) {
  //      if(this.items[i] == item){
  //       this.items.splice(i, 1);
  //    }

}

