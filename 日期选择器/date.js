(function () {
    var datepicker={};
    datepicker.getMonthData=function(year,month){
        var ret=[];
        if(!year||!month){
            var today=new Date();
            year=today.getFullYear();
            month=today.getMonth()+1;
        }
        var firstDay=new Date(year,month-1,1);
        var firstDayWeekDay=firstDay.getDay();
        if(firstDayWeekDay==0) firstDayWeekDay=7;

        year=firstDay.getFullYear();
        month=firstDay.getMonth()+1;

        var lastDayOfLastMonth=new Date(year,month-1,0);
        var lastDateOfLastMonth=lastDayOfLastMonth.getDate();

        var preMonthDayCount=firstDayWeekDay-1;

        var lastDay=new Date(year,month,0);
        var lastDate=lastDay.getDate();

        for(var i=0;i<7*6;i++){
            var date=i+1-preMonthDayCount;
            var showDate=date;
            var thisMonth=month;
            if(date<=0){
                thisMonth=month-1;
                showDate=lastDateOfLastMonth+date;
            }else if(date>lastDate){
                thisMonth=month+1;
                showDate=showDate-lastDate;
            }
            if(thisMonth==0) thisMonth=12;
            if(thisMonth==13) thisMonth=1;

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate
            });
        }
        return {
            year:year,
            month:month,
            day:ret
        };
    }
    datepicker.build=function(year,month){
        monthData = this.getMonthData(year,month);
        var html='<div class="datepicker-header">' +
            '<a href="#" class="year-prev">&laquo;</a><a href="#" class="month-prev">&lt;</a>' +
            '<a href="#" class="year-next">&raquo;</a><a href="#" class="month-next">&gt;</a>' +
            '<span class="curr-month">'+monthData.year+'-'+monthData.month+'</span>' +
            '</div>' +
            '<div class="datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for(var i=0;i<monthData.day.length;i++){
            var date=monthData.day[i];
            if(i%7==0){
                html+='<tr>';
            }
            html+='<td data-date="'+date.date+'">'+date.showDate+'</td>';
            if(i%7==6){
                html+='</tr>'
            }
        }
        html+='</tbody>' +
            '</table>' +
            '</div>';
        return html;
    }
    datepicker.render=function(direction){
        var year=monthData.year;
        var month=monthData.month;
        switch (direction) {
            case -10:year--;break;
            case -1:month--;break;
            case 10:year++;break;
            case 1:month++;break;
            default:break;
        }
        var html = this.build(year,month);
        picker.innerHTML=html;
    }
    datepicker.init=function(input){
        var html = this.build();
        picker=document.createElement('div');
        picker.className='datepicker';
        picker.innerHTML=html;
        document.body.appendChild(picker);

        var input=document.querySelector(input);
        var isopen=false;
        input.addEventListener('click',function(){
            if(isopen){
                picker.classList.remove('datepicker-show');
                isopen=false;
            }else{
                picker.classList.add('datepicker-show');
                var left=input.offsetLeft;
                var top=input.offsetTop;
                picker.style.top=top+input.offsetHeight+'px';
                picker.style.left=left+'px';
                isopen=true;
            }
        });
        picker.addEventListener('click',function (e) {
            var target= e.target;
            if(target.tagName!='A')
                return;
            switch (target.className) {
                case 'year-prev':datepicker.render(-10);break;
                case 'month-prev':datepicker.render(-1);break;
                case 'year-next':datepicker.render(10);break;
                case 'month-next':datepicker.render(1);break;
                default:break;
            }
        });
        picker.addEventListener('click',function (e) {
            var target=e.target;
            if(target.tagName.toLowerCase()!='td') return;
            var date=new Date(monthData.year,monthData.month-1,target.dataset.date);
            input.value=format(date);
        });
    }
    function format(date){
        var ret='';
        var padding=function(num){
            if(num<=9){
                return '0'+num;
            }else return num;
        }
        ret+=date.getFullYear()+'-';
        ret+=padding(date.getMonth()+1)+'-';
        ret+=padding(date.getDate());
        return ret;
    }

    window.datepicker=datepicker;
})();