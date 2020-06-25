const axios = require('axios');
const cheerio = require('cheerio');
const { html } = require('cheerio');
const list=require('./Model/List');
const url="https://news.ycombinator.com/news?p=";
var db,data

var lnk=[]
   
   axios.get(url).then(response=>{
        let getdata=(html)=>{
            data=[]
            const $=cheerio.load(html);
         
            $('span.comhead').each((i,ele)=>{
                let a = $(ele).prev()
              let title = a.text()
          let link = a.attr('href')
          let rank = a.parent().parent().text()
          let subtext = a.parent().parent().next().children('.subtext').children()
          let author = $(subtext).eq(1).text()
          let age = $(subtext).eq(2).text()
          let points = $(subtext).eq(0).text()
          let comments = $(subtext).eq(5).text()
          data.push({
            title: title,
             link: link,
             description:{
              author: author,
             age:age,
             points: parseInt(points),
             comments: comments,
             rank: parseInt(rank)
             }
             
          })
          lnk.push({link:link})
            })
      
           return data;
        }
        list.create(getdata(response.data))
        console.log(getdata(response.data))
       //db=new list(getdata(response.data))
       //db.save()
    }).catch(error=>{
        console.log(error);
    })
