import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXCEL_EXTENSION = '.xlsx';

const URL_BASE = `${environment.API}/report`;

@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  fileName: string = "Métricas del Chatbot";

  constructor(private _httpClient: HttpClient) { }

  exportExcelFile(obj: any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Métricas');
    worksheet.getColumn('B').width = 12;
    worksheet.getColumn('C').width = 12;
    worksheet.getColumn('D').width = 12;
    worksheet.getColumn('E').width = 12;
    worksheet.getColumn('F').width = 12;
    worksheet.getColumn('G').width = 12;
    worksheet.getColumn('H').width = 12;
    worksheet.getColumn('I').width = 12;
    worksheet.getColumn('J').width = 12;
    worksheet.getColumn('K').width = 12;
    worksheet.getColumn('L').width = 12;
    worksheet.getRow(5).height = 66;
    worksheet.getRow(8).height = 66;
    worksheet.getRow(11).height = 29;
    worksheet.getRow(12).height = 29;
    worksheet.getRow(13).height = 29;
    worksheet.getRow(14).height = 29;
    
    this.establecerEncabezados(worksheet,'E2','I2','Métricas de Interacciones');

    this.establecerEncabezados(worksheet,'B4','D4','Usuarios Registrados');
    this.establecerContenedor(worksheet,'B5','D5',obj.userRegistered);
    this.establecerEncabezados(worksheet,'F4','H4','Preguntas por Registrados');
    this.establecerContenedor(worksheet,'F5','H5',obj.questionsRegistered);
    this.establecerEncabezados(worksheet,'J4','L4','Preguntas por No Registrados');
    this.establecerContenedor(worksheet,'J5','L5',obj.questionsUnregistered);

    this.establecerEncabezados(worksheet,'B7','F7','Usuarios Masculinos');
    this.establecerContenedor(worksheet,'B8','F8',obj.man);
    this.establecerEncabezados(worksheet,'H7','L7','Usuarios Femeninos');
    this.establecerContenedor(worksheet,'H8','L8',obj.women);

    this.establecerEncabezados(worksheet,'B10','F10','Usuarios por Edad');
    this.establecerSemiEncabezados(worksheet,'B11','C11','De 0 a 17 años');
    this.establecerSemiContenedor(worksheet,'D11','F11',obj.rangeAge1);
    this.establecerSemiEncabezados(worksheet,'B12','C12','De 18 a 29 años');
    this.establecerSemiContenedor(worksheet,'D12','F12',obj.rangeAge2);
    this.establecerSemiEncabezados(worksheet,'B13','C13','De 30 a 59 años');
    this.establecerSemiContenedor(worksheet,'D13','F13',obj.rangeAge3);
    this.establecerSemiEncabezados(worksheet,'B14','C14','De 60 años a más');
    this.establecerSemiContenedor(worksheet,'D14','F14',obj.rangeAge4);
    this.establecerEncabezados(worksheet,'H10','L10','Usuarios por Tipo de Seguro');
    this.establecerSemiEncabezados(worksheet,'H11','I11','Regular');
    this.establecerSemiContenedor(worksheet,'J11','L11',obj.typeInsurance1);
    this.establecerSemiEncabezados(worksheet,'H12','I12','Potestativo');
    this.establecerSemiContenedor(worksheet,'J12','L12',obj.typeInsurance2);
    this.establecerSemiEncabezados(worksheet,'H13','I13','Trabajo de Riesgo');
    this.establecerSemiContenedor(worksheet,'J13','L13',obj.typeInsurance3);
    this.establecerSemiEncabezados(worksheet,'H14','I14','Agrario');
    this.establecerSemiContenedor(worksheet,'J14','L14',obj.typeInsurance4);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE, });
      fs.saveAs(blob, this.fileName + EXCEL_EXTENSION);
    });
  }

  establecerEncabezados(wb: Worksheet, rangoInicio: string, rangoFin: string, valor: string){
    wb.mergeCells(rangoInicio,rangoFin);
    wb.getCell(rangoInicio).value = valor;
    wb.getCell(rangoInicio).font = {
      name:'Aptos Narrow',
      size: 14,
      bold: true,
      color: {argb: 'FFFFFFFF'}
    };
    wb.getCell(rangoInicio).alignment = { vertical: 'middle', horizontal: 'center'};
    wb.getCell(rangoInicio).border = {
      top: {style: 'medium'},
      left: {style:'medium'},
      bottom: {style:'medium'},
      right: {style:'medium'}
    };
    wb.getCell(rangoInicio).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2D70FF' },
    }
  }

  establecerSemiEncabezados(wb: Worksheet, rangoInicio: string, rangoFin: string, valor: string){
    wb.mergeCells(rangoInicio,rangoFin);
    wb.getCell(rangoInicio).value = valor;
    wb.getCell(rangoInicio).font = {
      name:'Aptos Narrow',
      size: 11,
      bold: true,
      color: {argb: 'FF077FC8'}
    };
    wb.getCell(rangoInicio).alignment = { vertical: 'middle', horizontal: 'center'};
    wb.getCell(rangoInicio).border = {
      top: {style: 'medium'},
      left: {style:'medium'},
      bottom: {style:'medium'},
      right: {style:'medium'}
    };
  }

  establecerContenedor(wb: Worksheet, rangoInicio: string, rangoFin: string, valor: string){
    wb.mergeCells(rangoInicio,rangoFin);
    wb.getCell(rangoInicio).value = valor;
    wb.getCell(rangoInicio).font = {
      name:'Aptos Narrow',
      size: 48,
      bold: false,
      color: {argb: 'FF077FC8'}
    };
    wb.getCell(rangoInicio).alignment = { vertical: 'middle', horizontal: 'center'};
    wb.getCell(rangoInicio).border = {
      top: {style: 'medium'},
      left: {style:'medium'},
      bottom: {style:'medium'},
      right: {style:'medium'}
    };
  }

  establecerSemiContenedor(wb: Worksheet, rangoInicio: string, rangoFin: string, valor: string){
    wb.mergeCells(rangoInicio,rangoFin);
    wb.getCell(rangoInicio).value = valor;
    wb.getCell(rangoInicio).font = {
      name:'Aptos Narrow',
      size: 20,
      bold: false,
      color: {argb: 'FF000000'}
    };
    wb.getCell(rangoInicio).alignment = { vertical: 'middle', horizontal: 'center'};
    wb.getCell(rangoInicio).border = {
      top: {style: 'medium'},
      left: {style:'medium'},
      bottom: {style:'medium'},
      right: {style:'medium'}
    };
  }

  getListArchivos(){
    const url = `${URL_BASE}`;
    return this._httpClient.get<any>(url);
  }
}
