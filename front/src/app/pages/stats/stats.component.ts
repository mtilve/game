import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BackService } from '../../services/services';
import { Game, Stats, DataGraph } from  '../../clases/interfaces';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';
import 'style-loader!./stats.scss';

@Component({
  selector: 'stats',
  templateUrl: './stats.html',
  providers: [BackService, ToasterService]
})

  export class StatsComponent implements OnInit {
 
    status: any = '';
	  error: string = '';
    isLoading: boolean = true;

    config: ToasterConfig;
    position = 'toast-top-center';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

    options: any = {};
    data_wd1: string[] = [];
    data_wd2: number[] = [];

    optionsW: any = {};
    optionsL: any = {};
    data_gW: DataGraph[] = [];
    data_gL: DataGraph[] = [];
    sum: number = 0;
    winners:  Array<Game> = [];
    winnersCant:  Array<Stats> = [];
    settings = {
      actions: false,
      pager : {
          display: true,
          perPage: 5
      },
      columns: {
        nameWin: {
          title: 'Winner'
        },
        nameLose: {
          title: 'Loser'
        },
        round: {
          title: '# Rounds'
        },
        date: {
          title: 'Game Date',
          valuePrepareFunction: (date) => {  
            var raw = new Date(date);
            var formatted = new DatePipe('en-US').transform(raw, 'MM-dd-yyyy HH:mm');
            return formatted;
          } 
        }
      }
    };

    settingsTable2 = {
      actions: false,
      pager : {
          display: true,
          perPage: 5
      },
      columns: {
        _id: {
          title: 'Winner'
        },
        count: {
          title: '# Victories'
        }
      }
    };

    constructor(private router: Router,
                private backService: BackService) { }
 
    ngOnInit() 
    {      
      this.backService.GetTopWinners(1).subscribe((data:  Array<Stats>) => {

        this.data_gW = [];
        var self = this;
        data.forEach(function(item,index){
          var elem = { name: item._id, value: item.count };
          self.data_gW.push(elem);
        });

        this.optionsW = {
          backgroundColor: '#ffffff',
          color: ['#ffaf26', '#66b3ff', '#ff6680', '#5ce191', '#9b92ff'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['', '', '', '', ''],
            textStyle: {
              color: '#484848',
            },
          },
          series: [
            {
              name: 'Player',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.data_gW,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: '#484848',
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#bbbbbb',
                  },
                },
              },
            },
          ],
        };

      }, e => this.error = e, () => this.isLoading = false);

      this.backService.GetTopWinners(0).subscribe((data:  Array<Stats>) => {

        this.data_gL = [];
        var self = this;
        data.forEach(function(item,index){
          var elem = { name: item._id, value: item.count };
          self.data_gL.push(elem);
        });

        this.optionsL = {
          backgroundColor: '#ffffff',
          color: ['#ffaf26', '#66b3ff', '#ff6680', '#5ce191', '#9b92ff'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['', '', '', '', ''],
            textStyle: {
              color: '#484848',
            },
          },
          series: [
            {
              name: 'Player',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.data_gL,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: '#484848',
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#bbbbbb',
                  },
                },
              },
            },
          ],
        };

      }, e => this.error = e, () => this.isLoading = false);

      // Load victories array
      this.backService.GetGames().subscribe((data:  Array<Game>) => {

        this.winners  =  data.reverse();

      }, e => this.error = e, () => this.isLoading = false);

      // Load winners and cant array
      this.backService.GetWinners().subscribe((data:  Array<Stats>) => {

        this.winnersCant  =  data;

      }, e => this.error = e, () => this.isLoading = false);

      // Get winners by day

      this.backService.GetWinnersByDay().subscribe((data:  Array<Stats>) => {

        this.data_wd1 = [];
        this.data_wd2 = [];
        var self = this;
        data.forEach(function(item,index){
          self.data_wd1.push(item._id);
          self.data_wd2.push(item.count);
        });

      this.options = {
        backgroundColor: '#ffffff',
        color: ["#6f42c1", "#66b3ff"],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['', ''],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#66b3ff",
              },
            },
            axisLabel: {
              textStyle: {
                color: '#484848',
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Games By Day  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: this.data_wd1.reverse(),
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#9b92ff",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#66b3ff",
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
            name: '',
            type: 'line',
            smooth: true,
            data: this.data_wd2.reverse(),
          },
        ],
      };

    }, e => this.error = e, () => this.isLoading = false);

    }

    return()
    {
      this.router.navigate(['home']);
    }


 
}

