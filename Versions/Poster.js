console.clear();
console.log("By rbnwonknui");

function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(e => console.log('Audio play failed:', e));
}

playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

(function() {
  let isRunning = false;
  let currentDay = 65;
  let movieTitle = null;
  let gameStartTime = Date.now();

  function createNotificationStyles() {
      if (document.getElementById('framed-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'framed-styles';
      style.textContent = `
          .fe-notif{position:fixed;top:-120px;right:20px;background:rgba(15,23,42,.95);
          backdrop-filter:blur(20px);border:1px solid rgba(51,65,85,.6);border-radius:12px;
          padding:12px 16px;box-shadow:0 20px 40px rgba(0,0,0,.4);width:280px;
          transition:all .3s cubic-bezier(.4,0,.2,1);z-index:10000;
          font:600 13px -apple-system,sans-serif;color:#f8fafc;margin-bottom:8px}
          .fe-notif.show{top:20px;transform:translateY(0)}
          .fe-header{display:flex;align-items:center}
          .fe-icon{width:32px;height:32px;border-radius:8px;display:flex;
          align-items:center;justify-content:center;margin-right:10px;font-size:16px;
          box-shadow:0 4px 12px rgba(139,92,246,.3)}
          .fe-icon.info{background:linear-gradient(135deg,#2196F3,#1976D2)}
          .fe-icon.success{background:linear-gradient(135deg,#4CAF50,#388E3C)}
          .fe-icon.error{background:linear-gradient(135deg,#F44336,#D32F2F)}
          .fe-icon.movie{background:linear-gradient(135deg,#FF9800,#F57C00)}
          .fe-content h4{margin:0;font-size:13px;color:#f8fafc}
          .fe-content p{margin:2px 0 0;font-size:11px;color:#94a3b8}
          .fe-close{position:absolute;top:6px;right:6px;background:0;border:0;
          color:#64748b;cursor:pointer;padding:2px;border-radius:4px;width:20px;height:20px;
          display:flex;align-items:center;justify-content:center;font-size:14px}
          .fe-close:hover{background:rgba(51,65,85,.5);color:#f8fafc}
          .fe-bar{position:absolute;bottom:0;left:0;height:2px;
          background:linear-gradient(90deg,#ff6b35,#ff9500);border-radius:0 0 12px 12px;
          animation:progress 3s linear forwards}
          .fe-permanent .fe-bar{display:none}
          @keyframes progress{from{width:100%}to{width:0%}}
      `;
      document.head.appendChild(style);
  }

  function showNotif(title, subtitle, type = 'info', callback = null) {
      createNotificationStyles();
      
      const icons = { info: '📊', success: '✅', error: '❌', movie: '🎬' };
      const notif = document.createElement('div');
      notif.className = 'fe-notif';
      notif.innerHTML = `
          <button class="fe-close" onclick="this.parentElement.remove() && (window.frameNotifCallback && window.frameNotifCallback())">×</button>
          <div class="fe-header">
              <div class="fe-icon ${type}">${icons[type]}</div>
              <div class="fe-content">
                  <h4>${title}</h4>
                  <p>${subtitle}</p>
              </div>
          </div>
          <div class="fe-bar"></div>
      `;
      
      document.body.appendChild(notif);
      setTimeout(() => notif.classList.add('show'), 50);
      
      window.frameNotifCallback = callback;
      
      setTimeout(() => {
          if (notif.parentElement) {
              notif.style.opacity = '0';
              setTimeout(() => {
                  notif.remove();
                  if (callback) {
                      callback();
                  }
                  window.frameNotifCallback = null;
              }, 300);
          }
      }, 3000);
  }

  function showNotifPermanent(title, subtitle, type = 'info') {
      createNotificationStyles();
      
      const icons = { info: '📊', success: '✅', error: '❌', movie: '🎬' };
      const notif = document.createElement('div');
      notif.className = 'fe-notif fe-permanent';
      notif.style.setProperty('--permanent-display', 'block');
      notif.innerHTML = `
          <button class="fe-close" onclick="this.parentElement.remove()">×</button>
          <div class="fe-header">
              <div class="fe-icon ${type}">${icons[type]}</div>
              <div class="fe-content">
                  <h4>${title}</h4>
                  <p>${subtitle}</p>
              </div>
          </div>
      `;
      
      document.body.appendChild(notif);
      setTimeout(() => notif.classList.add('show'), 50);
      
      return notif;
  }

  async function fetchMovieData(day) {
      try {
          const url = `https://core.framed.wtf/poster/challenges/day/${day}`;
          
          console.log(`🔍 Fetching data for day ${day}...`);
          console.log(`📡 URL: ${url}`);
          
          const response = await fetch(url, {
              method: 'GET',
              mode: 'cors',
              headers: {
                  'Accept': 'application/json',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              }
          });
          
          if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          console.log(`✅ Data received for day ${day}:`);
          console.log(data);
          
          return data;
          
      } catch (error) {
          console.error('❌ Error fetching API data:', error);
          throw error;
      }
  }

  function collectFramedDay(day) {
      if (isRunning) {
          showNotif('Already running', 'System already active', 'error');
          return;
      }

      isRunning = true;
      gameStartTime = Date.now();
      currentDay = day;
      
      showNotif('System started', `Day ${day} detected`, 'info', async () => {
          try {
              const movieData = await fetchMovieData(day);
              
              const title = movieData?.asset?.title || 'Title not found';
              movieTitle = title;
              
              console.log(`🎬 Movie title: "${title}"`);
              
              showNotifPermanent('Correct answer!', `"${title}"`, 'movie');
              
          } catch (error) {
              console.error('❌ Error getting data:', error);
              showNotif('Search error', `Failed to get data for day ${day}`, 'error');
          } finally {
              isRunning = false;
          }
      });
  }

  function autoDetectDay() {
      const currentUrl = window.location.href;
      const dayMatch = currentUrl.match(/day=(\d+)/);
      return dayMatch ? parseInt(dayMatch[1]) : 65;
  }

  window.startFramedAnalyzer = (day = null) => {
      const targetDay = day || autoDetectDay();
      collectFramedDay(targetDay);
  };
  
  window.stopFramedAnalyzer = () => {
      if (!isRunning) {
          showNotif('Not running', 'System inactive', 'error');
          return;
      }
      isRunning = false;
      const elapsed = ((Date.now() - gameStartTime) / 1000).toFixed(1);
      showNotif('Stopped', `Interrupted after ${elapsed}s`, 'info');
  };
  
  window.framedStats = () => ({
      running: isRunning,
      currentDay: currentDay,
      elapsed: isRunning ? ((Date.now() - gameStartTime) / 1000).toFixed(1) : 0,
      movieTitle: movieTitle,
      url: `https://framed.wtf/archive/poster?day=${currentDay}`
  });

  showNotif('Loaded!', 'System ready to execute...', 'info');
  setTimeout(() => {
      const day = autoDetectDay();
      startFramedAnalyzer(day);
  }, 2000);

})();