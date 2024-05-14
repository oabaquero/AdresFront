import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Adquisicion } from "./interfaces/adquisicion";
import { AdquisicionService } from "./services/adquisicion.service";

import { MatDialog } from "@angular/material/dialog";
import { ModalAddEditComponent } from "./modals/modal-add-edit/modal-add-edit.component";
import { ModalHistoricoComponent } from "./modals/modal-historico/modal-historico.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = "AdresFront";
  displayedColumns: string[] = [
    "presupuesto",
    "nombreUnidad",
    "nombreBien",
    "cantidad",
    "valorUnitario",
    "valorTotal",
    "fecha",
    "nombreProveedor",
    "acciones",
  ];
  dataSource = new MatTableDataSource<Adquisicion>();

  constructor(
    private _adqusicionservice: AdquisicionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mostrarAdquisiciones();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarAdquisiciones() {
    this._adqusicionservice.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (e) => {},
    });
  }

  nuevaAdquisicion() {
    this.dialog
      .open(ModalAddEditComponent, {
        disableClose: true,
        width: "700px",
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == "creado") {
          this.mostrarAdquisiciones();
        }
      });
  }

  modalEditarAdquisicion(dataAdquisicion: Adquisicion) {
    this.dialog
      .open(ModalAddEditComponent, {
        disableClose: true,
        width: "700px",
        data: dataAdquisicion,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == "editado") {
          this.mostrarAdquisiciones();
        }
      });
  }

  modalHistoricoCambios(dataAdquisicion: Adquisicion) {
    this.dialog.open(ModalHistoricoComponent, {
      disableClose: true,
      width: "1000px",
      data: dataAdquisicion.id,
    });
  }
}
