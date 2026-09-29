# Workflow Reference

## Jalur utama

1. **Clarify** — pahami pengguna, masalah, outcome, constraint, dan out-of-scope.
2. **Specify** — tulis requirement, user flow, data, interface, error handling, security, dan acceptance criteria.
3. **Plan** — pecah pekerjaan menjadi tiket kecil yang independen dan dapat diverifikasi.
4. **Implement** — kerjakan satu tiket dalam loop inspect → test → implement → check.
5. **Verify** — jalankan check yang relevan dan cocokkan hasilnya dengan acceptance criteria.
6. **Document** — perbarui README atau dokumen teknis jika perubahan berdampak pada cara kerja sistem.

## Format tiket minimum

```markdown
## T01 — Nama tiket

### Objective
### Scope
### Dependencies
### Files Likely Involved
### Tests
### Acceptance Criteria
```

## Definition of Done

- tujuan tiket selesai;
- acceptance criteria terpenuhi;
- test, lint, type check, dan build yang relevan lulus;
- error dan regression risk diperiksa;
- dokumentasi diperbarui;
- tidak ada isu kritis yang disembunyikan.

## Penanganan kegagalan

Baca error asli, cari root cause, lakukan perubahan terkecil yang masuk akal, jalankan ulang check yang gagal, lalu jalankan regression check terkait. Jangan melakukan patch acak berulang.

## Contoh RAG

```text
Ide
→ klarifikasi corpus, query, citation, safety, dan latency
→ SPEC.md
→ ARCHITECTURE.md
→ TASKS.md
→ ingestion → metadata → chunking → embedding
→ retrieval → context → generation → citation validation
→ evaluation
```
