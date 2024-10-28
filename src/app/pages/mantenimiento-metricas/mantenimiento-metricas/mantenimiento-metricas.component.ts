import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { CompartidoFuncionesService } from 'src/app/data/service/compartido-funciones.service';
import { MetricasService } from 'src/app/data/service/metricas.service';
import { NotificationService } from 'src/app/data/service/notification.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-mantenimiento-metricas',
  templateUrl: './mantenimiento-metricas.component.html',
  styleUrls: ['./mantenimiento-metricas.component.scss']
})
export class MantenimientoMetricasComponent {
  public chartOptions!: Partial<ChartOptions>;
  public chartSegurosOptions!: Partial<ChartOptions>;
  dataMetricas: any = Object();
  waitData = false;

  constructor(public compartidoService      : CompartidoFuncionesService,
              private notificationService   : NotificationService,
              private metricaService        : MetricasService){

  }

  ngOnInit(){
    this.getDataMetricas()
  }

  getDataMetricas(){
    this.waitData = true;
    this.metricaService.getListArchivos().subscribe({
      next: (data)=>{
        this.dataMetricas = data.data;
        this.chartOptions = {
          series: [
            {
              name: "Usuarios",
              data: [data.data.rangeAge1, data.data.rangeAge2, data.data.rangeAge3, data.data.rangeAge4]
            }
          ],
          chart: {
            type: "bar"
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [
              "De 0 a 17 años",
              "De 18 a 29 años",
              "De 30 a 59 años",
              "De 60 años a más",
            ]
          }
        };
        this.chartSegurosOptions = {
          series: [
            {
              name: "Usuarios",
              data: [data.data.typeInsurance1, data.data.typeInsurance2, data.data.typeInsurance3, data.data.typeInsurance4]
            }
          ],
          chart: {
            type: "bar"
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [
              "Regular",
              "Potestativo",
              "Trabajo de Riesgo",
              "Agrario"
            ]
          }
        };
        console.log(data.data)
        this.waitData = false;
      },
      error: (error)=>{
        this.notificationService.warning(error.error.error);
        this.waitData = false;
      }
    })
  }

  doanloadFile(){
    this.metricaService.exportExcelFile(this.dataMetricas);
    this.notificationService.success('Se está preparando la descarga del reporte, por favor espere');
  }
}
