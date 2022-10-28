import {Component, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {ItemsService} from "../../services/items.service";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "../../dialogs/item-dialog/item-dialog.component";

@Component({
  selector: 'app-items-list-admin',
  templateUrl: './items-list-admin.component.html',
  styleUrls: ['./items-list-admin.component.css']
})
export class ItemsListAdminComponent implements OnInit {

  items!: Item[]
  displayColumns: string[] = ["name", "description", "price", "image", "category", "edit", "delete"];

  constructor(private itemService: ItemsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getAllItems().subscribe(items => this.items = items)
  }

  onDeleteItem(item: Item) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: "250px",
      data: {name: item.name}
    });
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result) {
        this.itemService.deleteItem(item._id)
          .subscribe(item => {
            this.getItems()
          })
      }
    })
  }
}
