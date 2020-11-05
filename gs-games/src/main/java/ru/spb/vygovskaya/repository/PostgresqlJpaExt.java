package ru.spb.vygovskaya.repository;

import org.hibernate.boot.MetadataBuilder;
import org.hibernate.boot.spi.MetadataBuilderContributor;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.type.StandardBasicTypes;

public class PostgresqlJpaExt {//implements MetadataBuilderContributor {
//    @Override
//    public void contribute(MetadataBuilder metadataBuilder) {
//        metadataBuilder.applySqlFunction(
//                "extract_month",
//                new SQLFunctionTemplate(
//                        StandardBasicTypes.DATE,
//                        "extract(month from ?1)"
//                )
//        );
//    }
}

