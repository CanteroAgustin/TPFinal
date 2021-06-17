import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { PacienteService } from 'src/app/services/paciente.service';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  user: User;
  historia;
  perfilImg;
  nombre;
  paciente: User;
  fileName= 'ExcelSheet.xlsx';

  constructor(private pacientesService: PacienteService) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.tipo === 'paciente') {
      this.paciente = { ...this.user };
    } else {
      this.paciente = this.pacientesService.getPaciente();
    }
    this.historia = this.paciente.historiaClinica;
    this.perfilImg = this.paciente.perfil1;
    this.nombre = `${this.paciente.nombre} ${this.paciente.apellido}`;
  }

  async generatePdf() {
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.add(await (await new Img(this.paciente.perfil1).alignment('center').width('100').build()));
    pdf.add(
      new Txt('Historia clinica').bold().alignment('center').fontSize(42).end
    );
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(new Txt('Perfil del paciente').bold().fontSize(20).end);
    pdf.add({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    pdf.add(" ");
    pdf.add("Nombre: " + this.paciente.nombre + " " + this.paciente.apellido);
    pdf.add("Altura: " + this.historia.altura);
    pdf.add("Peso: " + this.historia.peso);
    pdf.add("Temperatura: " + this.historia.temperatura);
    pdf.add("Presion: " + this.historia.presion);
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(new Txt('Datos adicionales').bold().fontSize(20).end);
    pdf.add({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    pdf.add(" ");
    this.historia.items.forEach(item => {
      pdf.add(item.titulo + ": " + item.descripcion);
    });
    pdf.create().download();
  }
}
