# AI Engineering Workflow Codex Plugin

Plugin Codex untuk mengubah permintaan software yang masih samar menjadi pekerjaan engineering yang terukur:

```text
Clarify → Specify → Plan → Implement → Verify → Document
```

## Instalasi

Plugin ini tersedia melalui marketplace personal Codex. Setelah terpasang, buka thread baru lalu panggil:

```text
$ai-engineering-workflow
```

### Codex, Claude Code, dan agent lain

Installer npm menyalin `SKILL.md` ke direktori skill pengguna. Default memasang ke Codex dan Claude Code sekaligus:

```bash
npx qalbu-ai-engineering-workflow
```

Jika package npm belum dipublikasikan, jalankan langsung dari GitHub:

```bash
npx github:Irfandroid/ai-engineering-workflow
```

Target tertentu:

```bash
npx qalbu-ai-engineering-workflow --target codex
npx qalbu-ai-engineering-workflow --target claude
npx qalbu-ai-engineering-workflow --target codex,claude --force
```

Installer tidak mengirim data ke luar, tidak membutuhkan dependency tambahan, dan tidak menimpa skill berbeda kecuali `--force` digunakan.

Contoh:

```text
$ai-engineering-workflow bantu pecah fitur chat RAG ini menjadi spesifikasi dan tiket implementasi
```

## Mode kerja

- **Grill** — menggali kebutuhan, batasan, risiko, dan pertanyaan terbuka.
- **To Spec** — membuat spesifikasi sumber kebenaran yang dapat diuji.
- **To Tickets** — memecah spesifikasi menjadi tiket kecil dengan acceptance criteria.
- **Implement** — mengerjakan satu tiket, menjalankan test/check, lalu mendokumentasikan hasil.
- **Verification** — memeriksa syntax, type check, lint, test, build, dan acceptance criteria.

Skill ini menjaga scope tetap kecil, menghindari asumsi tersembunyi, dan tidak mengklaim selesai tanpa verifikasi.

## Struktur

```text
.
├── .codex-plugin/plugin.json
├── skills/ai-engineering-workflow/SKILL.md
└── README.md
```

## Validasi lokal

```powershell
python <codex-skill-root>/plugin-creator/scripts/validate_plugin.py .
python <codex-skill-root>/skill-creator/scripts/quick_validate.py .\skills\ai-engineering-workflow
```

## Prinsip

```text
Pahami → Inspeksi → Putuskan → Implementasi → Test → Verifikasi
```

Plugin tidak menggantikan penilaian engineering. Ia membantu membuat pekerjaan lebih eksplisit, dapat ditinjau, dan dapat dibuktikan.
