"use client";

import { Gift, Download } from 'lucide-react';
import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import weddingData from '@/data/data.json';
import { Guest } from '@/lib/types';
import { useRoutePerspective } from '@/utils/routeUtils';

import { Button } from './ui/Button';

type GiftsSectionProps = {
  guest?: Guest;
};

const GiftsSection = ({ guest }: GiftsSectionProps) => {

  let { isBride, isGroom, isHome } = useRoutePerspective();
  if (!!guest) {
    isBride = guest.side === 'bride';
    isGroom = guest.side === 'groom';
  }

  const handleDownload = (imagePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gifts" className="bg-accent/20">
      <div className="section-container">
        <h2 className="section-title">Quà Cưới</h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-600 mb-10">
            Sự hiện diện của bạn trong ngày cưới của chúng mình là món quà lớn nhất.
            <br /> Nếu bạn không thể tham dự được thì thật đáng tiếc, hãy hẹn nhau một dịp khác nhé. Nếu bạn muốn gửi tình cảm từ xa, chúng mình có thể nhận được nó qua đây
          </p>

          <div className="flex justify-center gap-4 mb-10">
            {(isBride || isHome) && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    icon={<Gift size={16} />}
                  >
                    Cô Dâu
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Đến Cô Dâu</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image
                      src={weddingData.giftInfo.bride.bankInfo.qrCodePath}
                      alt="QR Code Cô Dâu"
                      className="w-full max-w-[400px] rounded"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleDownload(weddingData.giftInfo.bride.bankInfo.qrCodePath, 'qr-code-co-dau.png')}
                      icon={<Download size={16} />}
                    >
                      Tải QR Code
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {(isGroom || isHome) && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="primary"
                    className="flex items-center gap-2"
                    icon={<Gift size={16} />}
                  >
                    Chú Rể
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Đến Chú Rể</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image
                      src={weddingData.giftInfo.groom.bankInfo.qrCodePath}
                      alt="QR Code Chú Rể"
                      className="w-full max-w-[400px] rounded"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleDownload(weddingData.giftInfo.groom.bankInfo.qrCodePath, 'qr-code-chu-re.png')}
                      icon={<Download size={16} />}
                    >
                      Tải QR Code
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </section >
  );
};

export default GiftsSection;
