
import type { AppInfo, RowData } from '../types';

// Hardcoded data to simulate fetching from JSON files
const appsData: { apps: Record<string, Omit<AppInfo, 'id'>> } = {
    apps: {
        "app_01": { title: "VTV Go", dev: "Đài Truyền hình Việt Nam", poster: "https://picsum.photos/seed/vtvgo/300/170", url: "#", desc: "Ứng dụng xem truyền hình trực tuyến chính thức của VTV." },
        "app_02": { title: "FPT Play", dev: "FPT Telecom", poster: "https://picsum.photos/seed/fptplay/300/170", url: "#", desc: "Truyền hình trực tiếp, phim truyện và thể thao." },
        "app_03": { title: "VieON", dev: "DatVietVAC", poster: "https://picsum.photos/seed/vieon/300/170", url: "#", desc: "Siêu ứng dụng giải trí với nội dung độc quyền." },
        "app_04": { title: "Netflix", dev: "Netflix, Inc.", poster: "https://picsum.photos/seed/netflix/300/170", url: "#", desc: "Xem phim, chương trình TV và nhiều nội dung khác." },
        "app_05": { title: "YouTube", dev: "Google LLC", poster: "https://picsum.photos/seed/youtube/300/170", url: "#", desc: "Xem, phát trực tuyến và chia sẻ video." },
        "app_06": { title: "Spotify", dev: "Spotify AB", poster: "https://picsum.photos/seed/spotify/300/170", url: "#", desc: "Dịch vụ nhạc số, podcast và video." },
        "app_07": { title: "Zing MP3", dev: "VNG Corporation", poster: "https://picsum.photos/seed/zingmp3/300/170", url: "#", desc: "Nền tảng nghe nhạc trực tuyến hàng đầu Việt Nam." },
        "app_08": { title: "Galaxy Play", dev: "Galaxy Media", poster: "https://picsum.photos/seed/galaxyplay/300/170", url: "#", desc: "Dịch vụ xem phim trực tuyến của Việt Nam." },
        "app_09": { title: "TV360", dev: "Viettel", poster: "https://picsum.photos/seed/tv360/300/170", url: "#", desc: "Truyền hình trực tiếp và VOD từ Viettel." },
        "app_10": { title: "K+", dev: "VSTV", poster: "https://picsum.photos/seed/kplus/300/170", url: "#", desc: "Các kênh thể thao và giải trí cao cấp." },
        "app_11": { title: "Pops Kids", dev: "POPS Worldwide", poster: "https://picsum.photos/seed/popskids/300/170", url: "#", desc: "Nội dung an toàn và giáo dục cho trẻ em." },
        "app_12": { title: "BaoNet", dev: "BaoNet", poster: "https://picsum.photos/seed/baonet/300/170", url: "#", desc: "Tổng hợp tin tức từ nhiều nguồn khác nhau." }
    }
};

const rowsData: { rows: { title: string, apps: string[] }[] } = {
    rows: [
        { title: "Thịnh hành", apps: ["app_01", "app_02", "app_03", "app_04", "app_05"] },
        { title: "Giải trí", apps: ["app_04", "app_05", "app_08", "app_10"] },
        { title: "Âm nhạc & Âm thanh", apps: ["app_06", "app_07"] },
        { title: "Dành cho trẻ em", apps: ["app_11", "app_05"] },
        { title: "Tin tức & Thông tin", apps: ["app_12", "app_01"] }
    ]
};

export const loadAppData = async (): Promise<RowData[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const combinedData = rowsData.rows.map(row => ({
        title: row.title,
        apps: row.apps.map(appId => {
            const appDetails = appsData.apps[appId];
            return appDetails ? { ...appDetails, id: appId } : null;
        }).filter((app): app is AppInfo => app !== null)
    }));

    return combinedData;
};