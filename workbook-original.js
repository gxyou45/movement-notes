const titles = ['入门与初学者触碰','水碗技术','动作里程碑的基础','六个动作发展阶段','功能性中线','视觉、悬吊与重力','绝对地平线与张力','动作细节与里程碑动量','后续学习与计划'];
const chapter = Number(new URLSearchParams(location.search).get('chapter'));
const title = document.querySelector('#original-title');
const content = document.querySelector('#original-content');
if (!Number.isInteger(chapter) || chapter < 1 || chapter > titles.length) {
  title.textContent = '找不到这个章节';
  content.textContent = '请返回学习目录选择章节。';
} else {
  title.textContent = `第 ${chapter} 章 · ${titles[chapter - 1]}`;
  document.title = `${title.textContent} · Movement Notes`;
  for (const [id, number] of [['previous-chapter', chapter - 1], ['next-chapter', chapter + 1]]) {
    if (number >= 1 && number <= titles.length) {
      const link = document.getElementById(id);
      link.href = `?chapter=${number}`;
      link.hidden = false;
    }
  }
  Promise.all(['workbook-originals.json', 'workbook-translations.json'].map(url => fetch(url).then(response => {
    if (!response.ok) throw new Error('Unable to load chapter');
    return response.json();
  }))).then(([chapters, translations]) => {
    for (const page of chapters[chapter - 1].pages) {
      const section = document.createElement('section');
      section.className = 'original-paper';
      const heading = document.createElement('h2');
      heading.textContent = `PDF 第 ${page.page} 页`;
      section.append(heading);
      page.text.split('\n').forEach((line, index) => {
        if (!line.trim()) return;
        const text = document.createElement('p');
        text.className = 'original-text';
        text.textContent = line;
        section.append(text);
        const translation = translations[`${page.page}:${index}`];
        if (translation) {
          const chinese = document.createElement('p');
          chinese.className = 'original-translation';
          chinese.textContent = translation;
          section.append(chinese);
        }
      });
      content.append(section);
    }
  }).catch(() => { content.textContent = '章节内容加载失败，请检查网络并刷新页面。'; });
}
