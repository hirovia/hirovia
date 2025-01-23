window.addEventListener("load", () => {
    const clouds = document.querySelectorAll(".cloud");
    const texts = document.querySelectorAll(".monologue p");
    const clickPrompt = document.getElementById("click-prompt");
  
    // 雲のアニメーション
    setTimeout(() => {
      clouds[0].style.animation = "cloud-move-left 6s forwards";
      clouds[1].style.animation = "cloud-move-right 6s forwards";
    }, 100);
  
    // モノローグフェードイン
    let textIndex = 0;
    const fadeInTexts = () => {
      if (textIndex < 3) {
        texts[textIndex].style.opacity = 1;
        textIndex++;
        setTimeout(fadeInTexts, 3000); // 3秒ごとにフェードイン
      } else {
        setTimeout(() => {
          texts.forEach(text => {
            text.style.opacity = 0; // 3文全て表示後にフェードアウト
          });
          setTimeout(() => {
            // 次のテキストのフェードインを開始
            textIndex = 3;
            setTimeout(() => {
              texts[3].style.opacity = 1;
              setTimeout(() => {
                texts[4].style.opacity = 1;
                setTimeout(() => {
                  clickPrompt.style.display = "block"; // モノローグ終了後にクリック促進
                }, 1000);
              }, 2000);
            }, 2000);
          }, 1000);
        }, 3000);
      }
    };
  
    fadeInTexts();
  
    // クリックしたら次ページへ
    document.body.addEventListener("click", () => {
      if (clickPrompt.style.display === "block") {
        document.body.style.transition = "background 2s ease";
        document.body.style.backgroundColor = "white"; // 白にフェード
        setTimeout(() => {
          // 次ページに遷移するコードをここに追加
          window.location.href = "path_selection.html"; // 仮の遷移
        }, 2000);
      }
    });
  });
  
  // CSSアニメーションの定義
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes cloud-move-left {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-150vw); 
      }
    }
    @keyframes cloud-move-right {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(150vw); 
      }
    }
  `;
  document.head.appendChild(style);
  
// 道選択時の挙動（３ページ）
const paths = document.querySelectorAll('.arrow');  // .arrowクラスで矢印を選択

paths.forEach(path => {
  path.addEventListener('click', () => {
    // 背景色を変更し、スムーズに遷移するように設定
    document.body.style.transition = "background-color 1s ease, transform 1s ease";
    document.body.style.transform = "scale(1.1)"; // 背景を拡大するアニメーション

    // フェードアウトクラスを追加
    document.body.classList.add('fade-out');

    // 1秒後にページ遷移（アニメーション終了後）
    setTimeout(() => {
      let targetPage = "";
      if (path.id === "arrow-miyajima") {
        targetPage = "miyajimaPage.html"; // 宮島のページ
      } else if (path.id === "arrow-yama") {
        targetPage = "yamaPage.html"; // 山のページ
      } else if (path.id === "arrow-kure") {
        targetPage = "kurePage.html"; // 呉のページ
      }


      // ページ遷移
      window.location.href = targetPage;
    }, 1000);  // フェードアウトの時間に合わせて遷移
  });
});


// キャラクターカードがクリックされたときの処理
document.querySelectorAll('.character-card').forEach(card => {
  card.addEventListener('click', () => {
    // クリックされたキャラクターの名前と説明を表示する処理
    const characterId = card.id;
    showCharacterDetails(characterId);
  });
});

function showCharacterDetails(characterId) {
  // 仮のキャラクター情報。ここを動的に読み込むことも可能
  let characterDetails = {
    'character1': {
      name: 'キャラクター1',
      description: 'これはキャラクター1の説明文です。',
      videoUrl: 'https://www.youtube.com/watch?v=example1' // YouTubeリンク
    },
    'character2': {
      name: 'キャラクター2',
      description: 'これはキャラクター2の説明文です。',
      videoUrl: 'https://www.youtube.com/watch?v=example2' // YouTubeリンク
    }
  };

  const details = characterDetails[characterId];
  
  // 中央に大きな画像と名前、説明を表示
  document.querySelector('.main-character').innerHTML = `
    <h2>${details.name}</h2>
    <p>${details.description}</p>
    <a href="${details.videoUrl}" target="_blank">記憶を辿る</a>
  `;
  
  // 他のアクション（設定資料画など）を追加することもできます
}
