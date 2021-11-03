package models

import "gorm.io/gorm"

type Brand struct {
	*gorm.Model
	Name string `json:"name" gorm:"type:varchar(50)"`
	Year string `json:"year" gorm:"type:int(11)"`
}

type BrandInput struct {
	Name string `json:"name" binding:"required"`
	Year string `json:"year" binding:"required"`
}

type Laptop struct {
	*gorm.Model
	Name    string `json:"name" gorm:"type:varchar(50)"`
	Price   string `json:"year" gorm:"type:int(11)"`
	BrandID int    `json:"brand_id"`
	Brand   Brand  `json:"brand" gorm;"foreignKey:BrandID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
