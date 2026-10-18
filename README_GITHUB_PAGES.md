# Emre & Dilara Anı Dünyası — GitHub Pages / PWA

Piksel Dünya kaldırılmış, mobil uyumlu ve çevrimdışı önbellek destekli web sürümü.

## GitHub Pages ile yayınlama
1. GitHub üzerinde yeni bir repository oluştur.
2. Bu klasörün **içindeki tüm dosyaları** repository köküne yükle (index.html kökte bulunmalı).
3. Repository → Settings → Pages → Deploy from a branch seç. Branch olarak `main`, klasör olarak `/ (root)` seçip kaydet.
4. Yayın URL'sini ilk kez internet varken aç ve yüklenmesini bekle. Ardından tarayıcı menüsünden **Ana ekrana ekle** seçeneğini kullanabilirsin.

## Çevrimdışı davranış
- Service Worker, uygulama HTML dosyasını ve yerel medya dosyalarını ilk ziyaret sırasında önbelleğe almaya çalışır.
- İlk kurulum için internet gerekir. Tüm dosyaların önbelleğe alınması cihaz/tarayıcı depolama sınırlarına bağlıdır.
- Tailwind, Font Awesome ve Google Fonts harici CDN'lerden geliyor; bunlar ilk kullanımda çevrimiçi olmalıdır. Sonraki çevrimdışı kullanım, önbelleğe alınıp alınmadıklarına bağlıdır.
- Tarayıcı verileri temizlenirse yerel kayıtlar ve önbellek silinebilir. Film listesi `emreDilaraMovies_v3` anahtarını kullanmaya devam eder.

## Gizlilik uyarısı
Bu klasör `anı/`, `img/` ve `audio/` içindeki kişisel medya dosyalarını içerir. Public GitHub deposuna yüklersen, bu dosyalar da herkes tarafından görüntülenebilir/indirilebilir. “Gizlilik çok elzem değil” tercihin doğrultusunda bu paket doğrudan yayınlanabilir biçimde hazırlanmıştır; yine de herkese açık erişimi bilerek kabul ettiğinden emin ol. İstersen yüklemeden önce özel fotoğrafları çıkar.

## Önemli sınırlar
- Statik GitHub Pages, özel hesap doğrulaması veya güvenli çok cihazlı senkronizasyon sağlamaz.
- Yerel `localStorage` verileri cihaz ve tarayıcıya bağlıdır; otomatik olarak diğer cihazlara taşınmaz.
- GitHub'a yükleme/yayınlama işlemi bu paketin hazırlanmasıyla otomatik yapılmış değildir.
