// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg = style.getPropertyValue('--bg').trim();

  // --- Chart 1: Development Roadmap (Gantt-style timeline) ---
  var roadmapDom = document.getElementById('chart-roadmap');
  if (roadmapDom) {
    var roadmapChart = echarts.init(roadmapDom, null, { renderer: 'svg' });
    var periods = [
      '2-3岁\n自主性奠基',
      '3-4岁\n主动探索',
      '4-5岁\n心智理论突破',
      '5-6岁\n入学准备',
      '6-8岁\n学习习惯',
      '8-10岁\n逻辑思维'
    ];
    var eriksonTasks = [
      '自主性 vs 羞怯怀疑',
      '主动性 vs 内疚感',
      '主动性高峰期',
      '目的感建立',
      '勤奋 vs 自卑',
      '勤奋感深化'
    ];
    var piagetTasks = [
      '前运算早期\n符号功能',
      '前运算初期\n直觉思维',
      '前运算成熟\n认知灵活性飞跃',
      '前运算→具体运算\n过渡期',
      '具体运算初期\n守恒概念获得',
      '具体运算成熟\n可逆性思维'
    ];
    var keyMilestones = [
      '词汇爆发\n50→1000词',
      '抑制控制\n最快增长',
      '一级错误信念\n通过（里程碑）',
      '二级错误信念\n通过',
      '学习阅读\n解码关键期',
      '元认知萌芽\n学会学习'
    ];

    // Build timeline bars
    var ageRanges = [
      { name: '2-3岁', start: 2, end: 3 },
      { name: '3-4岁', start: 3, end: 4 },
      { name: '4-5岁', start: 4, end: 5 },
      { name: '5-6岁', start: 5, end: 6 },
      { name: '6-8岁', start: 6, end: 8 },
      { name: '8-10岁', start: 8, end: 10 }
    ];

    var eriksonData = ageRanges.map(function(r, i) {
      return { name: r.name, value: [i, r.start, r.end], label: eriksonTasks[i] };
    });
    var piagetData = ageRanges.map(function(r, i) {
      return { name: r.name, value: [i + 0.3, r.start, r.end], label: piagetTasks[i] };
    });
    var milestoneData = ageRanges.map(function(r, i) {
      return { name: r.name, value: [i + 0.6, r.start, r.end], label: keyMilestones[i] };
    });

    roadmapChart.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        formatter: function(p) {
          var d = p.data;
          return '<strong>' + d.name + '</strong><br/>' + (d.label || '').replace(/\n/g, '<br/>');
        }
      },
      grid: { left: 30, right: 30, top: 20, bottom: 40 },
      xAxis: {
        type: 'value',
        min: 2,
        max: 10,
        interval: 1,
        axisLabel: { formatter: '{value}岁', color: muted, fontSize: 12 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['关键里程碑', '皮亚杰认知', '埃里克森心理'],
        axisLabel: { color: ink, fontSize: 12, fontWeight: 600 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { show: false }
      },
      series: [
        {
          name: '埃里克森心理',
          type: 'custom',
          renderItem: function(params, api) {
            var catIndex = 2; // y-axis index for 埃里克森
            var start = api.coord([api.value(1), catIndex]);
            var end = api.coord([api.value(2), catIndex]);
            var height = 20;
            return {
              type: 'rect',
              shape: {
                x: start[0],
                y: start[1] - height / 2,
                width: Math.max(end[0] - start[0], 4),
                height: height
              },
              style: { fill: accent + 'cc', stroke: accent, lineWidth: 1, borderRadius: 4 },
              textContent: {
                type: 'text',
                style: {
                  text: api.value(3),
                  fill: ink,
                  fontSize: 10,
                  x: start[0] + 6,
                  y: start[1] - height / 2 + 4
                }
              }
            };
          },
          data: [
            { value: [2, 2, 3, '自主性 vs 羞怯怀疑'], name: '2-3岁' },
            { value: [2, 3, 6, '主动性 vs 内疚感'], name: '3-6岁' },
            { value: [2, 6, 10, '勤奋 vs 自卑'], name: '6-10岁' }
          ],
          encode: { x: [1, 2], y: 0 },
          clip: false
        },
        {
          name: '皮亚杰认知',
          type: 'custom',
          renderItem: function(params, api) {
            var catIndex = 1;
            var start = api.coord([api.value(1), catIndex]);
            var end = api.coord([api.value(2), catIndex]);
            var height = 20;
            return {
              type: 'rect',
              shape: {
                x: start[0],
                y: start[1] - height / 2,
                width: Math.max(end[0] - start[0], 4),
                height: height
              },
              style: { fill: accent2 + 'cc', stroke: accent2, lineWidth: 1, borderRadius: 4 },
              textContent: {
                type: 'text',
                style: {
                  text: api.value(3),
                  fill: ink,
                  fontSize: 10,
                  x: start[0] + 6,
                  y: start[1] - height / 2 + 4
                }
              }
            };
          },
          data: [
            { value: [1, 2, 7, '前运算阶段'], name: '2-7岁' },
            { value: [1, 7, 10, '具体运算阶段'], name: '7-10岁' }
          ],
          encode: { x: [1, 2], y: 0 },
          clip: false
        },
        {
          name: '关键里程碑',
          type: 'custom',
          renderItem: function(params, api) {
            var catIndex = 0;
            var start = api.coord([api.value(1), catIndex]);
            var end = api.coord([api.value(2), catIndex]);
            var height = 20;
            return {
              type: 'rect',
              shape: {
                x: start[0],
                y: start[1] - height / 2,
                width: Math.max(end[0] - start[0], 4),
                height: height
              },
              style: { fill: accent3 + 'cc', stroke: accent3, lineWidth: 1, borderRadius: 4 },
              textContent: {
                type: 'text',
                style: {
                  text: api.value(3),
                  fill: ink,
                  fontSize: 10,
                  x: start[0] + 6,
                  y: start[1] - height / 2 + 4
                }
              }
            };
          },
          data: [
            { value: [0, 2, 3, '词汇爆发 50→1000词'], name: '2-3岁' },
            { value: [0, 3, 4, '执行功能最快增长'], name: '3-4岁' },
            { value: [0, 4, 5, '通过错误信念任务'], name: '4-5岁' },
            { value: [0, 5, 6, '入学准备整合'], name: '5-6岁' },
            { value: [0, 6, 8, '学习阅读 解码关键期'], name: '6-8岁' },
            { value: [0, 8, 10, '元认知萌芽 学会学习'], name: '8-10岁' }
          ],
          encode: { x: [1, 2], y: 0 },
          clip: false
        }
      ]
    });
    window.addEventListener('resize', function() { roadmapChart.resize(); });
  }
})();