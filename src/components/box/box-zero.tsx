import { Component, Prop, State, h } from '@stencil/core'

@Component({
  tag: 'box-zero',
  styleUrl: 'box-zero.css',
  scoped: true,
})
export class ZeroBox {
  @Prop() as: 'header' | 'footer' | 'main' | 'article' | 'section' | 'aside'
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
  @Prop() row?: boolean
  @Prop() reverse?: boolean
  @Prop() wrap?: boolean
  @Prop() justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  @Prop() align?: 'center' | 'flex-start' | 'flex-end'
  @Prop() flex?: string
  @Prop() name?: string

  @State() colorfull: string

  componentDidLoad() {
    this.enableColorful()
  }

  box!: HTMLInputElement
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
    this.colorfull = boxLevelColors[this.getParentBoxesCount(this.box)]
    console.log(this.colorfull)
  }

  counter: number = 0
  getParentBoxesCount: any = (el: HTMLElement) => {
    if (el.parentElement!.tagName === 'BODY') {
      console.log(this.counter)

      return `_${this.counter}`
    } else if (el.classList.contains('box')) {
      this.counter++
      return this.getParentBoxesCount(el.parentElement)
    } else {
      return this.getParentBoxesCount(el.parentElement)
    }
  }

  render() {
    const Comp = this.as ? this.as : 'div'

    return (
      <Comp
        ref={el => (this.box = el as HTMLInputElement)}
        class="box"
        style={{
          borderColor: this.colorfull,
          flexDirection: this.row ? 'row' : 'column',
          justifyContent: this.justify,
          alignItems: this.align,
          flexWrap: this.wrap && 'wrap',
          flex: this.flex,
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
          maxHeight: this.h,
          maxWidth: this.w,
          height: this.h,
          width: this.w,
        }}
      >
        <slot />
        {this.name && this.colorfull && (
          <span style={{ color: this.colorfull }} class="name">
            {this.name}
          </span>
        )}
      </Comp>
    )
  }
}
