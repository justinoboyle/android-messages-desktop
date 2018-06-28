const css =
`
body {
    -webkit-app-region:drag;
}

input[type="submit"],
input[type="reset"],
input[type="button"],
input[type="text"],
div[role="application"],
content,
button,
textarea
 {
	-webkit-app-region: no-drag !important;
}
h1, h2, h3, h4, h5, h6 {
    -webkit-user-select: none;
}
`

function inject(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.head.appendChild(node);
    return node
}

const lightsCSS = `.traffic-lights {
    top: 1px;
    left: 8px;
  }
  .focus .traffic-lights > .traffic-light-close, .traffic-lights:hover > .traffic-light-close, .traffic-lights:active > .traffic-light-close {
    background-color: #ff6159;
  }
  .focus .traffic-lights > .traffic-light-close:active:hover, .traffic-lights:hover > .traffic-light-close:active:hover, .traffic-lights:active > .traffic-light-close:active:hover {
    background-color: #bf4942;
  }
  .focus .traffic-lights > .traffic-light-minimize, .traffic-lights:hover > .traffic-light-minimize, .traffic-lights:active > .traffic-light-minimize {
    background-color: #ffbd2e;
  }
  .focus .traffic-lights > .traffic-light-minimize:active:hover, .traffic-lights:hover > .traffic-light-minimize:active:hover, .traffic-lights:active > .traffic-light-minimize:active:hover {
    background-color: #bf8e22;
  }
  .focus .traffic-lights > .traffic-light-maximize, .traffic-lights:hover > .traffic-light-maximize, .traffic-lights:active > .traffic-light-maximize {
    background-color: #28c941;
  }
  .focus .traffic-lights > .traffic-light-maximize:active:hover, .traffic-lights:hover > .traffic-light-maximize:active:hover, .traffic-lights:active > .traffic-light-maximize:active:hover {
    background-color: #1d9730;
  }
  .traffic-lights > .traffic-light:before, .traffic-lights > .traffic-light:after {
    visibility: hidden;
  }
  .traffic-lights:hover > .traffic-light:before, .traffic-lights:active > .traffic-light:before, .traffic-lights:hover > .traffic-light:after, .traffic-lights:active > .traffic-light:after {
    visibility: visible;
  }
  .traffic-light {
    border-radius: 100%;
    padding: 0;
    height: 12px;
    width: 12px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-right: 3.5px;
    background-color: #ddd;
    position: relative;
    outline: none;
  }
  .traffic-light:before, .traffic-light:after {
    content: '';
    position: absolute;
    border-radius: 1px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .traffic-light-close:before, .traffic-light-close:after {
    background-color: #4d0000;
    width: 8px;
    height: 1px;
  }
  .traffic-light-close:before {
    transform: rotate(45deg);
  }
  .traffic-light-close:after {
    transform: rotate(-45deg);
  }
  .traffic-light-close:active:hover:before, .traffic-light-close:active:hover:after {
    background-color: #190000;
  }
  .traffic-light-minimize:before {
    background-color: #995700;
    width: 8px;
    height: 1px;
  }
  .traffic-light-minimize:active:hover:before {
    background-color: #592800;
  }
  .traffic-light-maximize:before {
    background-color: #006500;
    width: 6px;
    height: 6px;
  }
  .traffic-light-maximize:after {
    background-color: #28c941;
    width: 10px;
    height: 2px;
    transform: rotate(45deg);
  }
  .traffic-light-maximize:active:hover:before {
    background-color: #003200;
  }
  .traffic-light-maximize:active:hover:after {
    background-color: #1d9730;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 100;
  }
  h1, h2 {
    font-weight: 100;
  }
  h2 {
    margin: 0 0 10px;
  }
  .example {
    margin: 0 0 30px;
  }
  .container {
    width: 300px;
    margin: 0 auto;
  }
`
const lightsHTML = `
<script>

</script>
<span id="windowFrameFocus" class="focus">
<span class="traffic-lights">
  <button class="traffic-light traffic-light-close" id="close"></button>
  <button class="traffic-light traffic-light-minimize" id="minimize"></button>
  <button class="traffic-light traffic-light-maximize" id="maximize"></button>
</span>
</span>
`


window.onload = function() {
  inject(lightsCSS)
  inject(css)
  setTimeout(() => {

    document.getElementsByTagName('h1')[0].innerHTML = lightsHTML + ""
    var bw = require('electron').remote.getCurrentWindow();
    document.getElementById('close').onclick = function() { bw.close() }
    document.getElementById('minimize').onclick = function() { bw.minimize() }
    document.getElementById('maximize').onclick = function() { bw.maximize() }

    function t(f) {
      document.getElementById("windowFrameFocus").setAttribute("class", f ? "focus": "")
    }
  
    window.onblur = () => t(false)
    window.onfocus = () => t(true)
  }, 150)

 
}

