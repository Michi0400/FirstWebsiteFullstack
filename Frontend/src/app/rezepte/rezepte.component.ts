import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { Rezept } from "../models/rezept.model";
import { RezeptService } from '../rezept.service';
import { RezeptAddComponent } from "./rezept-add/rezept-add.component";
import { RezeptDeleteComponent } from "./rezept-delete/rezept-delete.component";
import { RezeptEditComponent } from './rezept-edit/rezept-edit.component';

@Component({
  selector: 'app-rezepte',
  templateUrl: './rezepte.component.html',
  styleUrls: ['./rezepte.component.css']
})
export class RezeptComponent implements OnInit {
  public trainingData = new MatTableDataSource<Rezept>();
  public displayedColumns: string[] = ['index', 'name', 'description', 'delete', 'edit', 'link'];
  public isEmpty = false;
  public editing = false;
  public helpId: string;

  constructor(private router: Router, private readonly repeptService: RezeptService, private readonly dialog: MatDialog) { };

  async ngOnInit() {
    this.trainingData.data = await this.repeptService.getAll();
  }

  public add() {
    this.dialog.open(RezeptAddComponent, {
      height: '600px',
      width: '800px',
    }).afterClosed()
      .subscribe(response => {
        if (response !== null) {
          this.trainingData.data = [...this.trainingData.data, response];
          this.isEmpty = false;
        }
      })
  }

  public async delete(data: any) {
    await this.repeptService.delete(data.id);
    this.trainingData.data = this.trainingData.data.filter(d => d.id !== data.id)
    if (this.trainingData.data.length == 0) {
      this.isEmpty = true;
    }
  }

  public async deleteAll(data: MatTableDataSource<Rezept>) {
    this.dialog.open(RezeptDeleteComponent)
      .afterClosed()
      .subscribe(response => {
        if (response) {
          data.data.forEach(async element => {
            await this.repeptService.delete(element.id);
            this.trainingData.data = this.trainingData.data.filter(d => d.id !== element.id);
          });
        }
      });

    if (this.trainingData.data.length == 0) {
      this.isEmpty = true;
    }
  }

  public edit(data: Rezept) {
    this.dialog.open(RezeptEditComponent, {
      data
    });
  }

  public applyFilter(filterValue: string) {
    this.trainingData.filter = filterValue.trim().toLowerCase();
  }
}
