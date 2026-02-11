# HTML
## Head elements
### Icon links
- \<link rel="icon" href="/Shoop/icon-32.png" sizes="32x32">
- \<link rel="icon" href="/Shoop/icon-192.png" sizes="192x192">
- \<link rel="icon" href="/Shoop/icon-512.png" sizes="512x512">
### Meta tags
- \<meta charset="utf-8">
- \<meta name="viewport" content="width=device-width, initial-scale=1">
### Manifest link
- \<link rel="manifest" href="/Shoop/manifest.json">
### Stylesheet links
- \<link rel="stylesheet" href="/Shoop/styles.css">
- \<link rel="stylesheet" href="/Shoop/*(Folder Name)*/styles.css">
### Script links
- \<script src="/Shoop/registerServiceWorker.js" defer>\</script>
- \<script type="module" src="/Shoop/general.js">\</script>
## Body elements
### Topbar
- \<header class="topbar" style="display:none">  
  \<button id="menuBtn" aria-label="Menu">☰\</button>  
  \<a id="profileLink">  
    \<img id="avatar" src="/Shoop/noProfile.webp" alt="Profile">  
  \</a>  
\</header>
### Status
- \<h1 id="status">Loading…\</h1>
### Div element
- \<div class="other" style="display:none">*(More Here)*\</div>

#### Everything in \<body> is under \<div class="light" style="display:block">*(X)*\</div>. There is also \<div class="dark" style="display:none">*(X)*\</div> which has the same things in it.