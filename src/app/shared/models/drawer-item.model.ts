export class DrawerItem {
    title: string;
    link: string;
    icon: string;
    image: string

    constructor(public theTitle : string, public theLink : string, public theIcon, public theImage) {
        this.title = theTitle;
        this.link = theLink;
        this.icon = theIcon;
        this.image = theImage;
    }
}