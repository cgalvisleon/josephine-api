const logo = function () {
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgYAAACRCAYAAAC4w3ByAAAAAXNSR0IArs4c6QAAAOxlWElmTU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAcAAAAcgEyAAIAAAAUAAAAjodpAAQAAAABAAAAogAAAAAAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzADIwMTQ6MTE6MTIgMTU6MTQ6NDEAAASQBAACAAAAFAAAANigAQADAAAAAQABAACgAgAEAAAAAQAAAgagAwAEAAAAAQAAAJEAAAAAMjAxNDoxMToxMiAxNToxNDo0MQDuCgCyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo0RDE5QjBEQzc0NkFFNDExQkRBNkUxN0VCMjRENzAwNTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo0QzE5QjBEQzc0NkFFNDExQkRBNkUxN0VCMjRENzAwNTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjRDMTlCMERDNzQ2QUU0MTFCREE2RTE3RUIyNEQ3MDA1PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93czwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNC0xMS0xMlQxNToxNDo0MSswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0QzE5QjBEQzc0NkFFNDExQkRBNkUxN0VCMjRENzAwNTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE0LTExLTEyVDE1OjE0OjQxKzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjREMTlCMERDNzQ2QUU0MTFCREE2RTE3RUIyNEQ3MDA1PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTQtMTEtMTJUMTU6MTQ6NDErMDE6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93czwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE0LTExLTEyVDE1OjE0OjQxKzAxOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNC0xMS0xMlQxNToxNDo0MSswMTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj41MTg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTQ1PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxkYzpm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5iZXzCCji30O1jzk3M3ecuDJQU7kYAiuCiiMwPOf/3y39957hwiLFi0qHFF3hIAQKAsCIgZlgbE6iTT5ryROvrFSPgU51+RNAt5IsJNMcv1u2ZotDueUo/ec6Zr9SXHkIFmtkLvpMtd9/Bu95aBzp3R1IQQKIbD77rs7fhIhIATGBwE5H44PzmXPpclvXjSlYqTAips9WdDq2cCy1Vvc7Ss2un7/1eY0ebCn08dgOVj3iOv05KBpR/3PFafrl3W9Y8cOt3r1ak+esrHMeiYdxjx0qT4N5N9PY5VBurq6ypCKc+VKZ7jClOLbQLrlxG24cpbrHu9JuXDF/2D79rF/PbUc7225cFE6o0NAFoPR4VUTsVmSOKXc0wejqBlGhFbvZPDEWm858KzgiD2mF205CDskrnvUNd30v67LWw5ybZNHkXN9RH388cfdpZde6u655x738MMPB+XS1tbmDjvsMPeCF7zAnXPOOW7SpEkFK4My+sc//uEuu+wy98ADD4TOGafPfffd1x144IHu9a9/vTvkkEMKPm83HnroIff3v/89lOOuu+5ydPTz5s1zL3rRi9xrX/vavHne4ttx3bp17mc/+1m4PO6449zpp5/uHn30UXfRRRe5f/3rXw4HwMmTJ7ujjz461OeVr3ylPTrikefxxKc8KO05c+a4I4880p188snu5S9/eebzt912m7PVCC996Uvd4Ycfno+3ZMkS98c//jFcv//973d77rmnu/POO93VV1/t7rjjDnffffe52bNnB8976vLqV786/2yhk7HiVii9SodTz9/85jfu9ttvDySU/Hjf9tprL/fiF7/YveIVr3Bz584tqhjd3d3u4osvdjfffHPADzLJ9A3v7tve9raQZqGEyvXeFkpf4eOHgIjB+GFdlpyYPqi8pWCEosIM/AC4xfsYLF8HOXDuMMiBPxYzMGa1QifkYMmv3bbj3uRyHVNGyLB+bv/tb39zn/70p/Oe3lZyLAe33npr+P3lL39xX/jCF9x+++1nt/NHlO473/lOd++99+bDOKHTfeSRR8Lvr3/9q/vYxz7m3vCGN3hrDY0xVH7729+6r33ta+G5+O7TTz/tLrnkEverX/3Kffvb33annXZafDucb9myJSgaLjo7O4OSed/73reTxYFyXn/99eH3n//8x33mM59x06ZNG5JWHPD973/fsVQvFqwp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`;
};

const style = function () {
  return `
/* -------------------------------------
    GLOBAL
    A very basic CSS reset
------------------------------------- */
* {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    font-size: 14px;
}

img {
    max-width: 100%;
}

body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100% !important;
    height: 100%;
    line-height: 1.6;
}

/* Let's make sure all tables have defaults */
table td {
    vertical-align: top;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
body {
    background-color: #f6f6f6;
}

.body-wrap {
    background-color: #f6f6f6;
    width: 100%;
}

.container {
    display: block !important;
    max-width: 600px !important;
    margin: 0 auto !important;
    /* makes it centered */
    clear: both !important;
}

.content {
    max-width: 600px;
    margin: 0 auto;
    display: block;
    padding: 20px;
}

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
}

.content-wrap {
    padding: 20px;
}

.content-block {
    padding: 0 0 20px;
}

.header {
    width: 100%;
    margin-bottom: 20px;
}

.footer {
    width: 100%;
    clear: both;
    color: #999;
    padding: 20px;
}
.footer a {
    color: #999;
}
.footer p, .footer a, .footer unsubscribe, .footer td {
    font-size: 12px;
}

/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    color: #000;
    margin: 40px 0 0;
    line-height: 1.2;
    font-weight: 400;
}

h1 {
    font-size: 32px;
    font-weight: 500;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 18px;
}

h4 {
    font-size: 14px;
    font-weight: 600;
}

p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
}
p li, ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
}

/* -------------------------------------
    LINKS & BUTTONS
------------------------------------- */
a {
    color: #367fee;
    text-decoration: underline;
}

.btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #367fee;
    border: solid #367fee;
    border-width: 5px 10px;
    line-height: 2;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    text-transform: capitalize;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.aligncenter {
    text-align: center;
}

.alignright {
    text-align: right;
}

.alignleft {
    text-align: left;
}

.clear {
    clear: both;
}

/* -------------------------------------
    ALERTS
    Change the class depending on warning email, good email or bad email
------------------------------------- */
.alert {
    font-size: 24px;
    font-weight: 500;
    color: #fff;    
    padding: 20px;
    text-align: center;
    border-radius: 5px 5px 0 0;
}
.alert a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
}
.alert.alert-warning {
    background: #f8ac59;
}
.alert.alert-bad {
    background: #ed5565;
}
.alert.alert-good {
    background: rgb(45, 50, 65);
}

/* -------------------------------------
    INVOICE
    Styles for the billing table
------------------------------------- */
.invoice {
    margin: 40px auto;
    text-align: left;
    width: 80%;
}
.invoice td {
    padding: 5px 0;
}
.invoice .invoice-items {
    width: 100%;
}
.invoice .invoice-items td {
    border-top: #eee 1px solid;
}
.invoice .invoice-items .total td {
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    font-weight: 700;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 640px) {
    h1, h2, h3, h4 {
        font-weight: 600 !important;
        margin: 10px 0 5px !important;
    }

    h1 {
        font-size: 22px !important;
    }

    h2 {
        font-size: 18px !important;
    }

    h3 {
        font-size: 16px !important;
    }

    .container {
        width: 100% !important;
    }

    .content, .content-wrap {
        padding: 10px !important;
    }

    .invoice {
        width: 100% !important;
    }
}`;
};

const mailAction = function (title, message, button, href) {
  const img = logo();
  const css = style();
  href = href || "";
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Actionable emails e.g. reset password</title>
  <style>
    ${css}
  </style>
</head>

<body>

<table class="body-wrap">
  <tr>
    <td></td>
    <td class="container" width="600">
      <div class="content">
        <table class="main" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="content-wrap">
              <table  cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img class="img-fluid" src="${img}"/>
                  </td>
                </tr>
                <tr>
                  <td class="content-block">
                    <h3>${title}</h3>
                  </td>
                </tr>
                <tr>
                  <td class="content-block">
                  ${message}
                  </td>
                </tr>
                <tr>
                  <td class="content-block aligncenter">
                    <a href="${href}" class="btn-primary">${button}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div class="footer">
          <table width="100%">
            <tr>
              <td class="aligncenter content-block">Te enviamos este correo electrónico para notificarte acerca de cambios importantes en tu cuenta.</td>
            </tr>
            <tr>
              <td class="aligncenter content-block">© 2020 Dploy</td>
            </tr>
          </table>
        </div>
      </div>
    </td>
    <td></td>
  </tr>
</table>

</body>
</html>`;
};

const mailAlert = function (title, subtitle, message, button, href, thanks) {
  const css = style();
  href = href || "";
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Alerts e.g. approaching your limit</title>
  <style>
    ${css}
  </style>
</head>

<body>

<table class="body-wrap">
  <tr>
    <td></td>
    <td class="container" width="600">
      <div class="content">
        <table class="main" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="alert alert-good">
              ${title}
            </td>
          </tr>
          <tr>
            <td class="content-wrap">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <strong>${subtitle}</strong>
                  </td>
                </tr>
                <tr>
                  <td class="content-block">
                    ${message}
                  </td>
                </tr>
                <tr>
                  <td class="content-block">
                    <a href="${href}" class="btn-primary">${button}</a>
                  </td>
                </tr>
                <tr>
                  <td class="content-block">
                    ${thanks}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div class="footer">
          <table width="100%">
            <tr>
              <td class="aligncenter content-block">Te enviamos este correo electrónico para notificarte acerca de cambios importantes en tu cuenta.</td>
            </tr>
            <tr>
              <td class="aligncenter content-block">© 2020 Dploy</td>
            </tr>
          </table>
        </div>
      </div>
    </td>
    <td></td>
  </tr>
</table>

</body>
</html>`;
};

module.exports = {
  mailAction,
  mailAlert,
};
