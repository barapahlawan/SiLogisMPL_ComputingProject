package com.BE_SiLogisMPL.ComPro;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.BE_SiLogisMPL.ComPro.DTO.CompanyProfileDTO;

public class JacksonTest {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = "{\"username\":\"admin\",\"email\":\"a@a.com\",\"noTelepon\":\"123\",\"headlineBaris1\":\"A\",\"headlineBaris2\":\"B\",\"headlineBaris3\":\"C\",\"tagline\":\"D\",\"teksTombolCTA\":\"E\",\"angkaStatistik1\":\"F\",\"angkaStatistik2\":\"G\",\"labelStatistik1\":\"H\",\"labelStatistik2\":\"I\",\"teksBadge\":\"J\",\"urlGambarOtomatis\":\"K\",\"urlGambarManual\":\"L\",\"altText\":\"M\",\"judulSeksiSiapaKami\":\"N\",\"paragrafUtama\":\"O\",\"paragrafLanjutan\":\"P\",\"judulVisi\":\"Q\",\"judulMisi\":\"R\",\"judulSeksiNilai\":\"S\",\"judulSeksiLayanan\":\"T\",\"subJudulSeksiLayanan\":\"U\",\"deskripsiSampingKanan\":\"V\",\"judulSeksiKendaraan\":\"W\",\"deskripsiPengantar\":\"X\",\"teksTombolLihatSemua\":\"Y\",\"noVisi\":1,\"noMisi\":2,\"poinVisi\":[\"A\"],\"poinMisi\":[\"B\"],\"infoKilat\":[{\"A\":\"B\"}],\"nilai\":[{\"A\":\"B\"}],\"layanan\":[{\"A\":\"B\"}],\"kendaraan\":[{\"A\":\"B\"}]}";
            CompanyProfileDTO dto = mapper.readValue(json, CompanyProfileDTO.class);
            System.out.println("Success! noVisi=" + dto.getNoVisi());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
