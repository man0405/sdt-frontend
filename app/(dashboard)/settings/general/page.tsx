"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

import { SettingsSection } from "@/components/settings/settings-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GeneralSettingsPage() {
  const [name, setName] = useState("Nguyễn Văn An");
  const [email, setEmail] = useState("an@example.com");
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh");
  const [language, setLanguage] = useState("vi");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800); // replace with real API call
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Chung</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quản lý thông tin tài khoản cá nhân.
        </p>
      </div>

      <SettingsSection
        title="Ảnh hồ sơ"
        description="Hiển thị trên hồ sơ và trong các cuộc trò chuyện được chia sẻ."
        footer={
          <>
            <Button variant="outline" size="sm">
              Xóa
            </Button>
            <Button size="sm">Tải ảnh mới lên</Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={name} />
              <AvatarFallback className="text-lg">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="size-3" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            JPG, PNG hoặc GIF. Dung lượng tối đa 2 MB.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Thông tin cá nhân"
        description="Cập nhật tên và email của bạn."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label htmlFor="full-name">Họ và tên</Label>
          <Input
            id="full-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Địa chỉ email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Chúng tôi sẽ gửi liên kết xác minh nếu bạn thay đổi email.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Tùy chọn"
        description="Đặt múi giờ và ngôn ngữ."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label>Múi giờ</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Ho_Chi_Minh">Giờ Việt Nam (GMT+7)</SelectItem>
              <SelectItem value="Asia/Kolkata">Giờ chuẩn Ấn Độ (IST)</SelectItem>
              <SelectItem value="America/New_York">Giờ miền Đông Hoa Kỳ (ET)</SelectItem>
              <SelectItem value="America/Los_Angeles">Giờ Thái Bình Dương (PT)</SelectItem>
              <SelectItem value="Europe/London">Giờ chuẩn Greenwich (GMT)</SelectItem>
              <SelectItem value="Asia/Tokyo">Giờ chuẩn Nhật Bản (JST)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ngôn ngữ</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="en">Tiếng Anh</SelectItem>
              <SelectItem value="hi">Tiếng Hindi</SelectItem>
              <SelectItem value="es">Tiếng Tây Ban Nha</SelectItem>
              <SelectItem value="fr">Tiếng Pháp</SelectItem>
              <SelectItem value="de">Tiếng Đức</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Thao tác nguy hiểm"
        description="Xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan."
      >
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div>
            <p className="text-sm font-medium">Xóa tài khoản</p>
            <p className="text-xs text-muted-foreground">
              Không thể hoàn tác thao tác này.
            </p>
          </div>
          <Button variant="destructive" size="sm">
            Xóa tài khoản
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
}