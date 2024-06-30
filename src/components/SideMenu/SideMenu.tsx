import NavList from "@/components/SideMenu/NavList/NavList";

const SideMenu = () => {
    return (
        <div className="w-52 pt-8 bg-blue-950 text-white">
            <div>
                <h1 className="px-4 text-xl font-bold">バス停留所-点検</h1>
                <NavList />
            </div>
        </div>
    );
}

export default SideMenu;