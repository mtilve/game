import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      //const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: '#ffffff',
        color: ['#9b92ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#bbbbbb',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#484848',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#bbbbbb',
              },
            },
            splitLine: {
              lineStyle: {
                color: '#ebeef2',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#484848',
              },
            },
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
