import React from 'react';
import styles from './index.css';

class FixComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.state = {
            style: {},
            fixed: false
        }
    }

    componentDidMount() {
        if (this.fixContainer && !this.parent) {
            this.parent = this.fixContainer && this.fixContainer.parentElement;
            while (this.parent && this.parent.scrollHeight === this.parent.clientHeight) {
                this.parent = this.parent.parentElement;
            }
        }
        if (this.parent) {
            this.parent.addEventListener("scroll", this.handleScroll);
            this.initialTop = this.fixContainer.getBoundingClientRect().top - this.parent.getBoundingClientRect().top;
            this.parentBorderTop = parseInt(getComputedStyle(this.parent, null).getPropertyValue('border-top-width'), 10);
            this.parentPaddingTop = parseInt(getComputedStyle(this.parent, null).getPropertyValue('padding-top'), 10);
        }

    }

    handleScroll() {
        var fixRect = this.fixContainer.getBoundingClientRect();
        var parentRect = this.parent.getBoundingClientRect();
        if (fixRect.top < parentRect.top && !this.state.fixed) {
            this.setState({
                fixed: true,
                style: {
                    position: 'fixed',
                    top: (parentRect.top + this.parentBorderTop + this.parentPaddingTop) + 'px'
                }
            });
        }
        else if (this.parent.scrollTop < this.initialTop && this.state.fixed) {
            this.setState({
                style: {},
                fixed: false
            });
        }
    }

    handleRef(ref) {
        this.fixContainer = ref;
        this.initialCSSPosition = this.fixContainer.style.position;
        this.initialCSSTop = this.fixContainer.style.top;
    }

    componentWillUnmount() {
        this.parent.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div
                ref={this.handleRef}
                className={styles.fixComponent}
                style={this.state.style}>
                {this.props.children}
            </div>
        );
    }
}

export default FixComponent;
