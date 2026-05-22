# Written Examination

## 项目查收

Github Pages 线上查收：[https://ngolin.github.io/written-examination/](https://ngolin.github.io/written-examination/).

或本地构建进行查收：[http://localhost:5173/written-examination/](http://localhost:5173/written-examination/).

```bash
git clone https://github.com/ngolin/written-examination.git
cd written-examination && npm install && npm run dev
```

## 实现说明

第一、第二题的实现以 `written-examination.zip` 为基础，除 TailwindCSS 外无新增其他依赖。第一题的响应设计完全通过 CSS 媒体查询实现；第二题所用到的 `Switch`, `Radio`, `Popup` 等 UI 均为没有外部依赖的简化版实现。

### Popup

在实现 [Popup](https://github.com/ngolin/written-examination/blob/master/src/Header/usePopup.tsx) 时，通过监听 `document/mousedown` 实现点击任意位置关闭悬浮面板，通过监听 `trigger/mousedown` 实现打开悬浮面板。有两个实现细节：

1. 为了避免点击 `trigger` 时同时触发 `trigger` 和 `document` 的 `mousedown`, 需要在 `trigger` 的监听上停止事件冒泡；
2. 为了避免多个悬浮面板同时处于打开状态，需要用全局变更保存所有关闭面板的引用，在打开面板前通过全局引用关闭之前所有的面板。

### Switch

[Switch](https://github.com/ngolin/written-examination/blob/master/src/Tablist/Switch.tsx) 是受控开关组件，UI 完全由外部状态控制，无内部 State. 切换时 UI 过渡动效完全通过 CSS Transition 实现，性能良好，体验流畅。代码方面实现较简洁、可维护性较强，组件实现和接口定义的命名都是 `Switch`, 在使用时 `import { Switch }` 就能同时引入组件实现和接口定义。

```tsx
export interface Switch {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, onChange }: Switch) => {
  return (
    <div className={checked ? 'bg-blue' : 'bg-gray'} onClick={() => onChange(!checked)}>
      <div className={checked ? 'left-[23px]' : 'left-[3px]'} />
    </div>
  );
};
```

### Ratio

[Ratio](https://github.com/ngolin/written-examination/blob/master/src/Tablist/Ratio.tsx) 也是受控组件，分两层实现。第一层是 Ratio Group, 它有多个选项；第二层 `RatioItem` 是受控开关，本质跟 `Switch` 一样，所以复用了 `Switch` 的接口定义。另外，`RatioItem` 通过纯 CSS 低成本实现了 Hover 父元素时高亮子元素的细致体验。

```tsx
import type { Switch } from './Switch';

interface RadioItem extends Switch {
  title: string;
}

const RadioItem = ({ checked, onChange, title }: RadioItem) => {
  return (
    <div className="group" onClick={() => onChange(!checked)}>
      <div className={checked ? 'border-blue' : 'border-gray group-hover:border-blue'}>
        <div className={checked ? 'bg-blue' : 'bg-white'} />
      </div>
      <div>{title}</div>
    </div>
  );
};
```

## 设计原则

### 接口隔离

第二题的实现体现了较好的分层架构，每一层的组件也比较符合接口隔离原则，职责单一，接口清晰，方便组件之间的组合和复用。同时每层组件的接口类型定义也通过 `Pick`, `Omit` 等类型工具进行复用。

```tsx
export interface Tablist {
  list: Array<Omit<List, 'onChange'>>;
  onChange?: (list: Array<Omit<List, 'onChange'>>) => void;
}

export interface List {
  title: string;
  checked: boolean;
  items: Array<Omit<ListItem, 'onChange'>>;
  onChange: (list: Omit<List, 'onChange'>) => void;
}

interface ListItem {
  label: string;
  value: 'weekly' | 'monthly';
  onChange: (value: ListItem['value']) => void;
}
```

### 焦点分离

本项目没有把所有图标 SVG 资源集中在一个目录下管理，而是把这些资源分散在不同的组件目录中。因为组件才是真正被复用的最小单位，图标只是组件的实现细节。从组件的视角集中管理该组件相关的资源（包括图标、样式、API 接口、子组件等），有利于降低认识成本，实现更好的焦点分离。

```bash
src
├── Header
│   ├── avatar.svg
│   ├── index.tsx
│   ├── logo.svg
│   ├── menu.svg
│   ├── search.svg
│   └── usePopup.tsx
└── Tablist
    ├── List.tsx
    ├── Ratio.tsx
    ├── Switch.tsx
    ├── index.tsx
    ├── more.svg
    └── remove.svg
```

此外，为便于问题回溯，本项目严格遵循“一个提交对应一个需求”的原则，通过 `git rebase -i`, `git cherry-pick`, `git commit --amend` 等工具保持提交历史清晰、可追溯，同时兼顾代码设计和代码历史的质量。

```bash
59c0066 feat: github pages
83391bf feat: written test 2
a72e356 feat: written test 1
0d616ff feat: initial commit
```

## 第三题：最优算法

> 小明想要通过查看往届游戏比赛的排名来确定自己比赛的目标分数。他希望找到往届比赛中排名第三的分数，作为自己的目标。具体规则如下：

> - 如果分数中有三个或以上不同的分数，返回其中第三大的分数。
> - 如果不同的分数只有两个或更少，那么小明将选择最大的分数作为他的目标。

> 请你帮小明根据给定的分数数组计算目标分数。

```typescript
function targetScore(scores: number[]): number {
  const uniqueScores = Array.from(new Set(scores));

  if (uniqueScores.length >= 3) {
    return uniqueScores.sort((a, b) => b - a)[2];
  } else {
    return Math.max(...uniqueScores);
  }
}
```
