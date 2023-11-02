import { Component, Prop, State, Element, h } from '@stencil/core'

@Component({
  tag: 'box-zero',
  styleUrl: 'box-zero.css',
  shadow: true,
})
export class Box {
  @Prop() name?: string
  @Prop() as?: 'header' | 'footer' | 'main' | 'article' | 'section' | 'aside'
  @Prop() h?: string
  @Prop() w?: string
  @Prop() m?: string
  @Prop() mt?: string
  @Prop() mb?: string
  @Prop() mr?: string
  @Prop() ml?: string
  @Prop() p?: string
  @Prop() pt?: string
  @Prop() pb?: string
  @Prop() pr?: string
  @Prop() pl?: string
  @Prop() flex?: string
  @Prop() row?: boolean
  @Prop() block?: boolean
  @Prop() justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  @Prop() align?: 'center' | 'flex-start' | 'flex-end'
  @Prop() gap?: string
  @Prop() rowGap?: string
  @Prop() columnGap?: string
  @Prop() wrap?: boolean
  @Prop() border?: string
  @Prop() borderWidth?: string
  @Prop() borderStyle?: string
  @Prop() borderColor?: string
  @Prop() borderRadius?: string
  @Prop() cursor?: string
  @Prop() pointerEvents?: string
  @Prop() zIndex?: string
  @Prop() boxShadow?: string
  @Prop() background?: string

  @State() colorfull: string

  @Element() el: HTMLElement

  componentWillLoad() {
    this.addStylesToRoot()
    if (this.el.hasAttribute('name')) {
      this.enableColorful()
    }
  }

  enableColorful = () => {
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
    this.colorfull = boxLevelColors[this.getParentBoxesCount(this.el)]
    this.el.style['borderColor'] = this.colorfull
  }

  counter = 0
  getParentBoxesCount: any = (el: HTMLElement) => {
    if (el.parentElement.tagName === 'BODY') {
      return `_${this.counter}`
    } else if (el.tagName === 'BOX-ZERO' && el.hasAttribute('name')) {
      this.counter++
      return this.getParentBoxesCount(el.parentElement)
    } else {
      return this.getParentBoxesCount(el.parentElement)
    }
  }

  addStylesToRoot() {
    let styles = {
      height: this.h,
      width: this.w,
      maxHeight: this.h,
      maxWidth: this.w,
      margin: this.m && this.m,
      marginTop: !this.mt ? this.m : this.mt,
      marginBottom: !this.mb ? this.m : this.mb,
      marginRight: !this.mr ? this.m : this.mr,
      marginLeft: !this.ml ? this.m : this.ml,
      padding: this.p,
      paddingTop: !this.pt ? this.p : this.pt,
      paddingBottom: !this.pb ? this.p : this.pb,
      paddingRight: !this.pr ? this.p : this.pr,
      paddingLeft: !this.pl ? this.p : this.pl,
      display: this.block && 'block',
      flex: this.flex,
      flexDirection: this.row ? 'row' : 'column',
      justifyContent: this.justify,
      alignItems: this.align,
      gap: this.gap,
      rowGap: this.rowGap,
      columnGap: this.columnGap,
      flexWrap: this.wrap && 'wrap',
      borderWidth: this.borderWidth,
      borderStyle: this.borderStyle,
      borderColor: this.colorfull ? this.colorfull : this.borderColor,
      borderRadius: this.borderRadius,
      cursor: this.cursor,
      pointerEvents: this.pointerEvents,
      zIndex: this.zIndex,
      boxShadow: this.boxShadow,
      backgroundColor: this.background,
    }
    for (const property in styles) {
      this.el.style[property] = styles[property]
    }
  }

  render() {
    if (this.name && this.colorfull) {
      return [
        <slot />,
        <span class="box-name" style={{ color: this.colorfull }}>
          {this.name}
        </span>,
      ]
    } else {
      return <slot />
    }
  }
}
