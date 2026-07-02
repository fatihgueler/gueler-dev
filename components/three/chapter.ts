/**
 * Kapitel-Fortschritt für die Signal-Szene.
 *
 * Die Startseite erzählt in fünf Kapiteln (IDs unten). Die Szene braucht
 * daraus einen KONTINUIERLICHEN Wert c ∈ [0..5]:
 *   0 = Hero (Signal materialisiert), 1 = Ihr Problem (Signal zerstreut
 *   sich im Rauschen), 2 = Ihr Weg (Ordnung entsteht), 3 = Der Beweis
 *   (Verdichtung zu Werk-Clustern), 4 = Ihr Erfolg (ruhige Konstellation),
 *   5 = Ihr Moment (fast still — der CTA dominiert, der Kristall kehrt zurück).
 *
 * Gemessen wird gegen die Dokument-Position der Anker; zwischen zwei Ankern
 * wird linear interpoliert. Von der 3D- UND der 2D-Variante genutzt.
 */

export const CHAPTER_ANCHOR_IDS = [
  "chapter-1",
  "chapter-2",
  "projekte",
  "chapter-4",
  "chapter-5",
] as const;

export type ChapterTracker = {
  /** Kontinuierlicher Kapitelwert für die aktuelle Scroll-Position. */
  value: () => number;
  /** Anker neu vermessen (nach Resize/Layout-Shift). */
  measure: () => void;
};

export function createChapterTracker(): ChapterTracker {
  // Dokument-Y, an dem Kapitel i als "erreicht" gilt (Anker minus halber
  // Viewport → das Kapitel zählt, sobald es die Bildschirmmitte erreicht).
  let stops: number[] = [];

  const measure = () => {
    const half = window.innerHeight * 0.5;
    stops = CHAPTER_ANCHOR_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return Number.POSITIVE_INFINITY;
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY - half;
    });
  };

  const value = () => {
    const y = window.scrollY;
    if (stops.length === 0 || y <= 0) return 0;
    // vor dem ersten Anker: 0 → 1 über die Strecke bis zum Anker
    if (y < stops[0]) return stops[0] > 0 ? y / stops[0] : 1;
    for (let i = 0; i < stops.length - 1; i++) {
      if (y < stops[i + 1]) {
        const span = stops[i + 1] - stops[i];
        return i + 1 + (span > 0 ? (y - stops[i]) / span : 0);
      }
    }
    return stops.length; // hinter dem letzten Anker: 5
  };

  return { value, measure };
}
