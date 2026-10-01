import React, { useState } from 'react';
import { X, Check, Copy, Share2, QrCode, ExternalLink, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(true);

  if (!isOpen) return null;

  // Use the live public URL or current window location
  const shareUrl = window.location.href.split('#')[0];
  const shareTitle = '立方工坊 Cube Work | 3D 列印整合應用與客製化製造';
  const shareSummary = '快速、精準、客製化，不只是3D列印，更是陪伴您將設計呈現實體的製造夥伴。';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      addToast('官網連結已成功複製至剪貼簿！', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('複製失敗，請手動選取網址', 'error');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareSummary,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    } else {
      handleCopy();
    }
  };

  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareTitle + '\n' + shareSummary + '\n' + shareUrl)}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=171717&qzone=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">
            分享立方工坊官網
          </h3>
        </div>
        <p className="text-xs text-neutral-500 mb-6 pl-10.5">
          透過 LINE、社群或 QR Code 將工坊資訊分享給合作夥伴或客戶
        </p>

        {/* Link Copy Box */}
        <div className="mb-5">
          <label className="block text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider mb-2">
            官方網站連結
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-200 focus-within:border-neutral-900 transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-neutral-800 font-mono focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                copied
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製連結</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={lineShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>分享至 LINE</span>
          </a>

          <a
            href={fbShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>分享至 FB</span>
          </a>
        </div>

        {/* Native mobile share button if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full mb-6 py-2.5 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-neutral-500" />
            <span>開啟手機原生分享選單</span>
          </button>
        )}

        {/* QR Code Section */}
        <div className="pt-4 border-t border-neutral-100 text-center">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer mb-3"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQr ? '收合 QR Code' : '顯示手機掃描 QR Code'}</span>
          </button>

          {showQr && (
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-50 border border-neutral-200 animate-in fade-in">
              <div className="p-2 bg-white rounded-lg border border-neutral-200 shadow-xs mb-2">
                <img
                  src={qrImageUrl}
                  alt="Cube Work Website QR Code"
                  className="w-36 h-36 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                手機相機掃描即可直接開啟瀏覽
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
