import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { User } from 'src/app/models/user';
import { PacienteService } from 'src/app/services/paciente.service';

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
  fileName = 'ExcelSheet.xlsx';

  constructor(private pacientesService: PacienteService, private rutaActiva: ActivatedRoute) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.historia = JSON.parse(this.rutaActiva.snapshot.params.historia);
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.tipo === 'paciente') {
      this.paciente = { ...this.user };
    } else {
      this.paciente = this.pacientesService.getPaciente();
    }
    //this.historia = this.paciente.historiaClinica;
    this.perfilImg = this.paciente.perfil1;
    this.nombre = `${this.paciente.nombre} ${this.paciente.apellido}`;
  }

  async generatePdf() {
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.header(await (await new Img('assets/logo.png').alignment('center').width('100').build()));
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(" ");
    pdf.add({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    pdf.add(
      new Txt('Historia clinica').bold().alignment('center').fontSize(42).end
    );
    pdf.add({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] });
    pdf.add(" ");
    pdf.add(await (await new Img(this.paciente.perfil1).width('100').build()));
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(new Txt('Perfil del paciente').bold().fontSize(20).end);
    pdf.add(" ");
    pdf.add(new Table([
      [
        new Txt("Nombre: ").bold().end,
        new Txt(`${this.paciente.nombre} ${this.paciente.apellido}`).end
      ],
      [
        new Txt("Altura: ").bold().end,
        new Txt(this.historia.altura).end
      ],
      [
        new Txt("Peso: ").bold().end,
        new Txt(this.historia.peso).end
      ],
      [
        new Txt("Temperatura: ").bold().end,
        new Txt(this.historia.temperatura).end
      ],
      [
        new Txt("Presion: ").bold().end,
        new Txt(this.historia.presion).end
      ]
    ]).end);
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(new Txt('Especialista').bold().fontSize(20).end);
    pdf.add(new Txt(`${this.historia.especialista.nombre} ${this.historia.especialista.apellido}`).end); 
    pdf.add(" ");
    pdf.add(" ");
    pdf.add(new Txt('Datos adicionales').bold().fontSize(20).end);
    pdf.add(" ");
    this.historia.items.forEach(item => {
      pdf.add(item.titulo + ": " + item.descripcion);
    });
    pdf.create().download();
  }
}
