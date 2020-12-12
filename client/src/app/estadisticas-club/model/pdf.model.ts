import { jsPDF } from 'jspdf';
import * as html2canvas from 'html2canvas';

export class PdfModel {
  private pdf: any;
  private page: number;
  private totalPage: number;
  private nameFile: string;
  private idsImages: string[];

  private nameReport: string;
  private title: string;
  private subtitle: string[];

  private colores: any;
  private logoEncabezado: any;

  private maxHeight: number = 900;
  private sizeTextoNormal: number = 12;
  private textoNormal: string = 'normal';
  private textoCursiva: string = 'italic';

  constructor() {
    this.pdf = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
    this.colores = {
      blanco: {rojo: 255, verde: 255, azul: 255},
      verdeFoot: {rojo: 3, verde: 156, azul: 138},
      negro: {rojo: 0, verde: 0, azul: 0},
      grisClaro: {rojo: 169, verde: 169, azul: 169}
    };
    this.logoEncabezado = this.getLogoApp();
    this.subtitle = [];
    this.idsImages = [];
    this.page = 0;
    this.totalPage = 1;
  }

  setNameFile(name: string) {
    this.nameFile = name + '.pdf';
  }

  setTotalPages(cant: number) {
    this.totalPage = cant;
  }

  setNameReport(name: string) {
    this.nameReport = name;
  }

  setTitle(title: string) {
    this.title = title;
  }

  addSubtitle(subtitle: string) {
    this.subtitle.push(subtitle);
  }

  addIdImage(id: string) {
    this.idsImages.push(id);
  }

  generate(verticalPage?: boolean) {
    let positionPage = verticalPage ? 'landscape' : 'portrait';
    // @ts-ignore
    this.pdf = new jsPDF(positionPage, 'mm', 'a4');
    let posYTextoTitulo: number = 28;
    let posYTextoDescripcion: number = posYTextoTitulo + 8;
    let posXTexto: number = 10;
    let sizeTextoTitulo: number = 20;
    this.page = 1;

    this.generarPagina();

    this.agregarTexto(this.textoNormal, sizeTextoTitulo, posXTexto, posYTextoTitulo, this.title);

    this.subtitle.forEach(texto => {
      this.agregarTexto(this.textoNormal,
        this.sizeTextoNormal, posXTexto, posYTextoDescripcion, texto);
      posYTextoDescripcion += 6;
    });

    let newPage = false;

    this.idsImages.forEach((id, index) => {
      this.addImagetoPdf(id, posYTextoDescripcion, (index + 1) == this.idsImages.length, newPage);
      posYTextoDescripcion += 100;
      if (newPage) {
        posYTextoDescripcion = 30;
        newPage = false;
      } else {
        newPage = true;
      }
    });
  }

  clear() {
    this.title = '';
    this.subtitle = [];
    this.idsImages = [];
    this.page = 0;
    this.totalPage = 0;
    this.nameReport = '';
    this.nameFile = '';
  }

  private addImagetoPdf(elementId: string, positionY: number, download: boolean, newPage: boolean) {
    html2canvas(document.getElementById(elementId), {
      height: 500,
      width: 1400,
      scale: 1,
      backgroundColor: null,
      logging: false,
    } as Html2Canvas.Html2CanvasOptions).then(canvas => {
      let can = canvas;
      const imgData = can.toDataURL('image/png');
      this.pdf.addImage(imgData, 'PNG', 10, positionY, 210, 110);
      if (newPage && !download) {
        this.pdf.addPage();
        this.generarPagina();
      }
      if (download) this.descargar();
    });
  }

  private dibujarEncabezado() {
    let hoy = new Date();
    let optionsDate = {weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit'};
    let heightEncabezado = 18;
    let posYImagen = 2;
    let posXImagen = 4;
    let tamImg = 14;
    let posYText = heightEncabezado - 5;
    let posXText = tamImg + posXImagen + 4;
    let posXDerecha = this.pdf.internal.pageSize.width - 87;

    this.pdf.setDrawColor(0);
    this.pdf.setFillColor(this.colores.verdeFoot.rojo, this.colores.verdeFoot.verde,
      this.colores.verdeFoot.azul);
    this.pdf.rect(0, 0, this.pdf.internal.pageSize.width, heightEncabezado, 'F');
    this.pdf.addImage(this.logoEncabezado, 'PNG', posXImagen, posYImagen, tamImg, tamImg);
    this.agregarTexto(this.textoCursiva, 18, posXText, posYText, this.nameReport,
      this.colores.blanco);
    this.agregarTexto(this.textoCursiva, this.sizeTextoNormal, posXDerecha, posYText,
      this.capitalizeFirtsLetter(hoy.toLocaleDateString('es-AR', optionsDate)),
      this.colores.blanco);
  }

  private dibujarPieDePagina() {
    let alturaPiePagina = 9;
    let posXDerecha = this.pdf.internal.pageSize.width - 30;
    let posY = this.pdf.internal.pageSize.height - alturaPiePagina;
    let posYTextoPagina = posY + 6;
    this.pdf.setDrawColor(0);
    this.pdf.setFillColor(this.colores.grisClaro.rojo,
      this.colores.grisClaro.verde, this.colores.grisClaro.azul);
    this.pdf.rect(0, posY, this.pdf.internal.pageSize.width, alturaPiePagina, 'F');
    this.agregarTexto(this.textoCursiva,
      10, posXDerecha, posYTextoPagina, `Página ${this.page} de ${this.totalPage}`);
    this.page++;
  }

  private agregarTexto(tipo: string, tamanio: number, posX: number, posY: number, texto: string, color?: any) {
    if (!color) color = this.colores.negro;
    this.pdf.setTextColor(color.rojo, color.verde, color.azul);
    this.pdf.setFontSize(tamanio);
    this.pdf.text(posX, posY, texto);
  }

  private generarPagina(): void {
    this.dibujarEncabezado();
    this.dibujarPieDePagina();
  }

  private capitalizeFirtsLetter(frase: string) {
    return frase.charAt(0).toUpperCase() + frase.slice(1) + 'Hs.';
  }

  private getLogoApp() {
    const logo = 'assets/logo.png';
    const image = new Image();
    image.src = logo;
    return image;
  }

  private descargar() {
    if (!this.nameFile) return;
    this.pdf.save(this.nameFile);
  }
}
