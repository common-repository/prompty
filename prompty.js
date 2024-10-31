/*  
  Copyright 2011 Kei Saito (email : kei.saito@gmail.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

var prompty = {};
prompty.target = null;
prompty.data = null;
prompty.prompts = ['% ', '# ', '> ', '$ '];
prompty.speed = 100;
prompty.buttonIdPrefix = '_promtpy:';
prompty.buttons = [];
prompty.contents = [];
prompty.isIE = navigator.appName == 'Microsoft Internet Explorer';

prompty.style = {};
prompty.style.padding = '1px';
prompty.style.border = '1px solid #999999';
prompty.style.color = '#999999';
prompty.style.backgroundColor = '#ffffff';
prompty.style.font = '8pt courier,sans-serif';
prompty.style.innerHTML = '&gt;Play';

prompty.setup = function()
{
  var elems = document.getElementsByTagName('pre');
  for (var i=0; i<elems.length; i++)
  {
    if (/prompty/.test(elems[i].className))
    {
      var pos = prompty.getPosition(elems[i]);
      var button = document.createElement('div');
      button.style.position = 'absolute';
      button.style.top = pos.y + 'px';
      button.style.left = pos.x + 'px';
      button.style.padding = prompty.style.padding;
      button.style.border = prompty.style.border;
      button.style.color = prompty.style.color;
      button.style.backgroundColor = prompty.style.backgroundColor;
      button.style.cursor = 'pointer';
      button.style.font = prompty.style.font;
      button.innerHTML = prompty.style.innerHTML;
      button.id = prompty.buttonIdPrefix + i;
      button.onclick = function() 
      { 
        prompty.hideButtons(); 
        prompty.start(this); 
      };
      elems[i].parentNode.insertBefore(button, elems[i]);
      // store all the button elements for show/hide buttons.
      prompty.buttons.push(button);
      // store all the pre tag text contents.
      prompty.contents.push(elems[i].textContent ? elems[i].textContent : elems[i].innerText);
    }
  }
}

prompty.showButtons = function()
{
  for (var i=0; i<prompty.buttons.length; i++)
    prompty.buttons[i].style.display='block';
}

prompty.hideButtons = function()
{
  for (var i=0; i<prompty.buttons.length; i++)
    prompty.buttons[i].style.display='none';
}

prompty.start = function(elem)
{
  var idx = elem.id.replace(prompty.buttonIdPrefix, '');
  prompty.target = elem.nextSibling;   // target pre tag
  prompty.target.innerHTML = '';       // clear the pre tag contents
  prompty.data = prompty.parse(prompty.contents[idx]);
  prompty.render();
}

prompty.parse = function(str)
{
  var lfstr = prompty.isIE ? '<br/>' : '\n';
  var lines = str.split('\n'); 
  var data = []; 
  
  for (var i=0; i<lines.length; i++)
  {    
    var p = prompty.isPrompt(lines[i]);
    var lf = (i==lines.length - 1 && !prompty.isIE ) ? '' : lfstr;
    if (p)
    {
      data.push(p);
      var command = lines[i].substring(p.length);
      var chars = command.split(''); 
      data = data.concat(chars);
      data.push(lf);
    }
    else
    {
      data.push(lines[i] + lf);
    }
  }
  return data;  
}

prompty.isPrompt = function(str)
{
  for (var i=0; i<prompty.prompts.length; i++)
    if (str.indexOf(prompty.prompts[i]) == 0)
      return prompty.prompts[i];
  return null;
}

prompty.render = function() 
{
  if (prompty.data.length == 0)
  {
    prompty.showButtons();
    return;
  }
  var c = prompty.data.shift();
  prompty.target.innerHTML += c;
  setTimeout('prompty.render()', prompty.speed);  
}

prompty.getPosition = function (elem)
{
  var left = 0, top = 0;
  if (elem.offsetParent)
  {
    do 
    {
      left += elem.offsetLeft;
      top += elem.offsetTop;
    } 
    while (elem = elem.offsetParent);
  }
  return {x:left, y:top};
}


