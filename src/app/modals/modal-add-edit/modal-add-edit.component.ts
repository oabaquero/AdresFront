import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import * as moment from "moment";

import { Adquisicion } from "src/app/interfaces/adquisicion";
import { AdquisicionService } from "src/app/services/adquisicion.service";
import { Parametrica } from "src/app/interfaces/parametrica";
import { ParametricaService } from "src/app/services/parametrica.service";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY", // this is how your date will be parsed from Input
  },
  display: {
    dateInput: "DD/MM/YYYY", // this is how your date will get displayed on the Input
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-modal-add-edit",
  templateUrl: "./modal-add-edit.component.html",
  styleUrls: ["./modal-add-edit.component.css"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ModalAddEditComponent implements OnInit {
  formAdquisicion: FormGroup;
  tituloAccion: string = "Nueva";
  botonAccion: string = "Guardar";
  listaUnidades: Parametrica[] = [];
  listaBienes: Parametrica[] = [];
  listaProveedores: Parametrica[] = [];
  constructor(
    private modalReferencia: MatDialogRef<ModalAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _parametricaService: ParametricaService,
    private _adquisicionService: AdquisicionService,
    @Inject(MAT_DIALOG_DATA) public dataAdquisicion: Adquisicion
  ) {
    this.formAdquisicion = this.fb.group({
      presupuesto: ["", Validators.required],
      unidadId: ["", Validators.required],
      bienId: ["", Validators.required],
      cantidad: ["", Validators.required],
      valorUnitario: ["", Validators.required],
      fecha: ["", Validators.required],
      proveedorId: ["", Validators.required],
      documentacion: ["", Validators.required],
    });

    this._parametricaService.getListBienes().subscribe({
      next: (data) => {
        this.listaBienes = data;
      },
      error: (e) => {},
    });
    this._parametricaService.getListProveedores().subscribe({
      next: (data) => {
        this.listaProveedores = data;
      },
      error: (e) => {},
    });
    this._parametricaService.getListUnidades().subscribe({
      next: (data) => {
        this.listaUnidades = data;
      },
      error: (e) => {},
    });
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  addEditAdquisicion() {
    console.log(this.formAdquisicion.value);
    const modelo: Adquisicion = {
      id: this.dataAdquisicion == null ? 0 : this.dataAdquisicion.id,
      presupuesto: this.formAdquisicion.value.presupuesto,
      unidadId: this.formAdquisicion.value.unidadId,
      nombreUnidad: "",
      bienId: this.formAdquisicion.value.bienId,
      nombreBien: "",
      cantidad: this.formAdquisicion.value.cantidad,
      valorUnitario: this.formAdquisicion.value.valorUnitario,
      valorTotal:
        this.formAdquisicion.value.valorUnitario *
        this.formAdquisicion.value.cantidad,
      fecha: moment(this.formAdquisicion.value.fecha).format("DD/MM/YYYY"),
      proveedorId: this.formAdquisicion.value.proveedorId,
      nombreProveedor: "",
      documentacion: this.formAdquisicion.value.documentacion,
    };

    if (this.dataAdquisicion) {
      this._adquisicionService
        .update(this.dataAdquisicion.id, modelo)
        .subscribe({
          next: (data) => {
            this.mostrarAlerta("Adquisición fue editada", "Listo");
            this.modalReferencia.close("editado");
          },
          error: (e) => {
            this.mostrarAlerta("No se pudo editar", "Error");
          },
        });
    } else {
      this._adquisicionService.add(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta("Adquisición fue creada", "Listo");
          this.modalReferencia.close("creado");
        },
        error: (e) => {
          this.mostrarAlerta("No se pudo crear", "Error");
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataAdquisicion) {
      this.formAdquisicion.patchValue({
        id: this.dataAdquisicion.id,
        presupuesto: this.dataAdquisicion.presupuesto,
        unidadId: this.dataAdquisicion.unidadId,
        bienId: this.dataAdquisicion.bienId,
        cantidad: this.dataAdquisicion.cantidad,
        valorUnitario: this.dataAdquisicion.valorUnitario,
        fecha: moment(this.dataAdquisicion.fecha, "DD/MM/YYYY"),
        proveedorId: this.dataAdquisicion.proveedorId,
        documentacion: this.dataAdquisicion.documentacion,
      });
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
}
