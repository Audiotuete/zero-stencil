export function assignRole(tagName) {
  const roleMap = {
    header: 'banner',
    footer: 'contentinfo',
    main: 'main',
    nav: 'navigation',
    article: 'article',
    section: 'region',
    search: 'search',
    aside: 'complementary',
  }
  return tagName ? roleMap[tagName] : 'none'
}

export function styleBoxWithProps(comp) {
  let styles = {
    height: comp.h,
    width: comp.w,
    maxHeight: comp.h,
    maxWidth: comp.w,
    margin: comp.m && comp.m,
    marginTop: !comp.mt ? comp.m : comp.mt,
    marginBottom: !comp.mb ? comp.m : comp.mb,
    marginRight: !comp.mr ? comp.m : comp.mr,
    marginLeft: !comp.ml ? comp.m : comp.ml,
    padding: comp.p,
    paddingTop: !comp.pt ? comp.p : comp.pt,
    paddingBottom: !comp.pb ? comp.p : comp.pb,
    paddingRight: !comp.pr ? comp.p : comp.pr,
    paddingLeft: !comp.pl ? comp.p : comp.pl,
    display: comp.block && 'block',
    flex: comp.flex,
    flexDirection: comp.row ? 'row' : 'column',
    justifyContent: comp.justify,
    alignItems: comp.align,
    gap: comp.gap,
    rowGap: comp.rowGap,
    columnGap: comp.columnGap,
    flexWrap: comp.wrap && 'wrap',
    borderWidth: comp.borderWidth,
    borderStyle: comp.borderStyle,
    borderColor: comp.colorfull ? comp.colorfull : comp.borderColor,
    borderRadius: comp.borderRadius,
    cursor: comp.cursor,
    pointerEvents: comp.pointerEvents,
    zIndex: comp.zIndex,
    boxShadow: comp.boxShadow,
    backgroundColor: comp.background,
  }
  return styles
}

export function getParentBoxesCount(el: HTMLElement, counter) {
  if (el.parentElement.tagName === 'BODY') {
    return `_${counter}`
  } else if (el.tagName.includes('BOX') && el.hasAttribute('name')) {
    counter++
    return getParentBoxesCount(el.parentElement, counter)
  } else {
    return getParentBoxesCount(el.parentElement, counter)
  }
}

export function enableColoredBoxes(comp) {
  if (!comp.root.hasAttribute('name')) return ''

  const boxLevelColors = {
    _1: '#6876FC',
    _2: '#38BDF8',
    _3: '#01B598',
    _4: '#99DA2F',
    _5: '#FBBF24',
    _6: '#FB923D',
    _7: '#F472B6',
    _8: '#C084FC',
    _9: '#9A1799',
    _10: '#595959',
  }

  let boxColor = boxLevelColors[getParentBoxesCount(comp.root, 0)]
  comp.root.style['borderColor'] = boxColor
  return boxColor
}
