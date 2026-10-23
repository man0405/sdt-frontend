export default function AppFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-muted-foreground sm:flex-row h-auto">
      <p>&copy; {new Date().getFullYear()} Phản hồi dịch vụ công. Bảo lưu mọi quyền.</p>

      <div className="flex items-center gap-4">
        <a href="/docs" className="hover:text-foreground transition-colors">
          Tài liệu
        </a>
        <a href="/support" className="hover:text-foreground transition-colors">
          Hỗ trợ
        </a>
        <a href="/status" className="hover:text-foreground transition-colors">
          Trạng thái
        </a>
        <span className="text-muted-foreground/60">v1.0.0</span>
      </div>
    </footer>
  );
}
