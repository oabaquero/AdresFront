import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Historico } from "src/app/interfaces/historico";
import { AdquisicionService } from "src/app/services/adquisicion.service";

@Component({
  selector: "app-modal-historico",
  templateUrl: "./modal-historico.component.html",
  styleUrls: ["./modal-historico.component.css"],
})
export class ModalHistoricoComponent implements OnInit {
  displayedColumns: string[] = [
    "dataAnterior",
    "dataActual",
    "diferencia",
    "fechaModificacion",
  ];
  dataSource = new MatTableDataSource<Historico>();
  constructor(
    private _adqusicionservice: AdquisicionService,
    @Inject(MAT_DIALOG_DATA) public dataAdquisicionId: number
  ) {}

  ngOnInit(): void {
    this.mostrarAdquisiciones();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostrarAdquisiciones() {
    this._adqusicionservice.getListHistorico(this.dataAdquisicionId).subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
        this.dataSource.data.forEach((item) => {
          try {
            item.dataActual = JSON.parse(item.dataActual);
          } catch {}
          try {
            item.dataAnterior = JSON.parse(item.dataAnterior);
          } catch {}
          try {
            item.diferencia = JSON.parse(item.diferencia);
          } catch {}
        });
      },
      error: (e) => {},
    });
  }
}
