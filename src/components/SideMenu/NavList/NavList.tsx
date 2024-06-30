import { FaHome } from "react-icons/fa";
import { GiBusStop } from "react-icons/gi";
import { TbMapSearch, TbBusStop } from "react-icons/tb";
import { IoCameraOutline } from "react-icons/io5";
import NavItem from "@/components/SideMenu/NavList/NavItem/NavItem";

interface NavItemTypeProps {
    id: number;
    label: string;
    link: string;
    icon: React.ReactNode;
}

const NavList = () => {
    const navList: NavItemTypeProps[] = [
        {
            id: 1,
            label: "Home",
            link: "/",
            icon: <FaHome className="size-5" />,
        },
        {
            id: 2,
            label: "地図",
            link: "/map",
            icon: <TbMapSearch className="size-5" />,
        },
        {
            id: 3,
            label: "現在地周辺",
            link: "/map/your_location",
            icon: <TbBusStop className="size-5" />,
        },
        {
            id: 4,
            label: "検索-バス停",
            link: "/search",
            icon: <GiBusStop className="size-5" />,
        },
        {
            id: 5,
            label: "カメラ",
            link: "/camera",
            icon: <IoCameraOutline className="size-5" />,
        },
    ];

    return (
        <div className="mt-24">
            {navList.map((item) => (
                <NavItem label={item.label} link={item.link} icon={item.icon} key={item.id} />
            ))}
        </div>
    );
}

export default NavList;